from rest_framework import response
import pdfkit
from django.http import HttpResponse, FileResponse
from django.shortcuts import get_object_or_404
from django.template.loader import get_template
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from django.core.files import File

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import authentication, generics, status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.mail import send_mail, EmailMessage
from django.conf import settings

from .models import SmartContract, Clause, Party
from .serializers import SmartContractSerializer, ClauseSerializer, PartySerializer
from django.contrib.auth import get_user_model

USER = get_user_model()

class CreateSmartContractView(APIView):
    """
    Create a smart contract
    """
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [JWTAuthentication,]

    def post(self, request):
        
        
        owner = USER.objects.get(email=request.data['owner'])
        name = request.data['name']
        description = request.data['description']
        print(f'{owner=}, {name=}, {description=}')
        
        if not owner or not name or not description:
            return Response({"message": "Missing fields"}, status=status.HTTP_400_BAD_REQUEST)
        
        if SmartContract.objects.filter(owner=owner, name=name).exists():
            return Response({"message": "Smart contract with that name already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            smartContract = SmartContract.objects.create(
                owner=owner,
                name=name,
                description=description
            )
            smartContract.save()
            party = Party.objects.create(
                contract=smartContract,
                party=owner,
                role='sender'
            )
            print(f'{party=}')
            party.save()
            return Response(
                {"success":"smart contract successfully created"},
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {"message": f"error creating post:{e=}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SmartContractListViewByOwner(APIView):
    """
    List all smart contracts by owner
    """
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [JWTAuthentication,]
    
    def get(self, request, email, type):
        owner = request.user
        # print(f'{owner=}, {email=}, {type=}')
        # type = request.data['type']
        # email = request.data['email']
        
        if not owner or not email or not type:
            return Response({"message": "Missing fields"}, status=status.HTTP_400_BAD_REQUEST)
        
        
        
        try:
            smartContracts = SmartContract.objects.filter(owner=owner, status=type)
            
            if not smartContracts:
                return Response({"message": "No smart contracts found"}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = SmartContractSerializer(smartContracts, many=True)
            return Response(
                {"contracts": serializer.data},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"message": f"error getting smart contracts:{e=}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class SmartContractListViewByStatus(APIView):
    """
    List all smart contracts by status
    """
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [JWTAuthentication,]
    
    def get(self, request):
        status = request.data["status"]
        
        try:
            smartContracts = SmartContract.objects.filter(
                status=status,
                # owner=request.user,
                party__user=request.user
                )
            serializer = SmartContractSerializer(smartContracts, many=True)
            return Response(
                {"contracts": serializer.data},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"message": f"error getting smart contracts:{e=}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class SmartContractDeleteView(APIView):
    """
    Delete a smart contract
    """
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [JWTAuthentication,]

    def delete(self, request, id):
        try:
            smartContract = SmartContract.objects.get(id=id)
            if smartContract.owner != request.user:
                return Response({"message": "You are not the owner of this smart contract"}, status=status.HTTP_400_BAD_REQUEST)
            if smartContract.status == "live":
                return Response({"message": "Cannot delete a live smart contract"}, status=status.HTTP_400_BAD_REQUEST)
            
            smartContract.delete()
            return Response(
                {"success": "smart contract successfully deleted"},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"message": f"error deleting smart contract:{e=}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetContractDetailView(APIView):
    """
    Get contract detail view
    """
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [JWTAuthentication,]
    
    def get(self, request, id):
        try:
            smartContract = SmartContract.objects.get(id=id)
            
            # if smartContract.owner != request.user:
            #     return Response({"message": "You are not the owner of this smart contract"}, status=status.HTTP_400_BAD_REQUEST)
            clauses = smartContract.clause_set.all()
            parties = smartContract.party_set.all()
            return Response(
                {"contract": SmartContractSerializer(smartContract).data,
                 "clauses": ClauseSerializer(clauses, many=True).data,
                 "parties": PartySerializer(parties, many=True).data},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"message": f"error getting smart contract:{e=}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class AddPartyToSmartContractView(APIView):
    """
    Invite party to smart contract view, through an email request
    """
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [JWTAuthentication,]
    
    def post(self, request, id):
        try:
            invitingParty = request.user
            newParty = request.data['newParty']
            newPartyRole = request.data['newPartyRole']
            newPartyInviteMessage = request.data['newPartyInviteMessage']
            print(f'{invitingParty=}, {newParty=}, {newPartyRole=}, {newPartyInviteMessage=}')
            
            emailContent = ""
            
            if not invitingParty or not newParty or not newPartyRole or not newPartyInviteMessage:
                return Response({"message": "Missing fields"}, status=status.HTTP_400_BAD_REQUEST)
            
            smartContract = SmartContract.objects.get(id=id)
            
            if smartContract.status == "live" and newPartyRole != "viewer":
                return Response({"message": "Cannot invite an active party to a live smart contract"}, status=status.HTTP_400_BAD_REQUEST)
            if smartContract.status == "completed" and newPartyRole != "viewer":
                return Response({"message": "Cannot invite an active party to a completed smart contract"}, status=status.HTTP_400_BAD_REQUEST)
            
            # handle if the newParty user is not already signed up
            if not USER.objects.filter(email=newParty).exists():
                emailContent = f"{invitingParty.email} has invited you to be a {newPartyRole} party, \
                    on the {smartContract.name} smart contract. \n However, you have not signed up yet. \
                    To signup, please visit {f'localhost:3000/signup'} \n \n \ "
                send_mail(
                    subject="You've been invited to a Smart Contract",
                    message=emailContent,
                    from_email=None,
                    recipient_list=[newParty,],
                    fail_silently=False,
                )
                return Response(
                    {"message": "This person is not signed up"},
                    status=status.HTTP_404_NOT_FOUND)
            
            # handle if newParty user is signed up, but not verified
            if not USER.objects.filter(email=newParty, is_active=True).exists():
                emailContent = f"{invitingParty.email} has invited you to be a {newPartyRole} party, \
                    on the {smartContract.name} smart contract. \n However, you have not activated your account yet. \
                    To activate, please visit {f'localhost:3000/resendactivationemail'} \n \n \ "
                return Response(
                    {"message": "This person is not verified"},
                    status=status.HTTP_412_PRECONDITION_FAILED)
                
            # handle if the inviting party is not a party to the smart contract
            # if not smartContract.party_set.filter(party__email=invitingParty).exists():
            #     return Response(
            #         {"message": "You are not a party to this smart contract"},
            #         status=status.HTTP_400_BAD_REQUEST)
            
            # handle if the user is already a party
            if smartContract.party_set.filter(party__email=newParty).exists():
                return Response(
                    {"message": "This person is already a party on this contract"},
                    status=status.HTTP_400_BAD_REQUEST)
                
            try:
                user = USER.objects.get(email=newParty)
                party = Party.objects.create(party=user, role=newPartyRole, contract=smartContract)
                party.save()
                smartContract.party_set.add(party)
                smartContract.save()
            except Exception as e:
                return Response(
                    {"message": f"error creating party:{e=}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            try:
                send_mail(
                    subject="You've been invited to a Smart Contract",
                    message=emailContent,
                    from_email=None,
                    recipient_list=[newParty,],
                    fail_silently=False,
                )
                return Response(
                    {"message": "Invitation sent via email successfully"},
                    status=status.HTTP_200_OK)
            except Exception as e:
                return Response(
                    {"message": f"error sending email:{e=}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        except Exception as e:
            return Response(
                {"message": f"error adding party to smart contract:{e=}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class AddClauseToContractView(APIView):
    """
    Add clause to smart contract view
    """
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [JWTAuthentication,]
    
    def post(self, request, contract_id):
        try:
            clauseContent = request.data['clauseContent']
            print(f'{clauseContent=}')
            
            if not clauseContent:
                return Response({"message": "Missing fields"}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                smartContract = SmartContract.objects.get(id=contract_id)
            except SmartContract.DoesNotExist:
                return Response(
                    {"message": "Could not find contract with that id when adding clause"},
                    status=status.HTTP_404_NOT_FOUND)
            
            if smartContract.status == "live":
                return Response({"message": "Cannot add a clause to a live smart contract"}, status=status.HTTP_400_BAD_REQUEST)
            if smartContract.status == "completed":
                return Response({"message": "Cannot add a clause to a completed smart contract"}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                clause = Clause.objects.create(content=clauseContent, contract=smartContract)
                clause.save()
                smartContract.clause_set.add(clause)
                smartContract.save()
            except Exception as e:
                return Response(
                    {"message": f"error creating clause:{e=}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
            return Response(
                {"message": "Clause successfully added"},
                status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message": f"error adding clause to smart contract:{e=}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class DeleteClauseFromContractView(APIView):
    """
    Delete clause from smart contract view
    """
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [JWTAuthentication,]
    
    def post(self, request, contract_id):
        try:
            clause_id = request.data['clause_id']
            print(f'{clause_id=}')
            
            if not clause_id:
                return Response({"message": "Missing fields: clause_id"}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                smartContract = SmartContract.objects.get(id=contract_id)
            except SmartContract.DoesNotExist:
                return Response(
                    {"message": "Could not find contract with that id when deleting clause"},
                    status=status.HTTP_404_NOT_FOUND)
            
            if smartContract.status == "live":
                return Response({"message": "Cannot delete a clause from a live smart contract"}, status=status.HTTP_400_BAD_REQUEST)
            if smartContract.status == "completed":
                return Response({"message": "Cannot delete a clause from a completed smart contract"}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                clause = Clause.objects.get(id=clause_id, contract=smartContract)
                clause.delete()
            except Exception as e:
                return Response(
                    {"message": f"error deleting clause:{e=}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        except Exception as e:
            return Response(
                {"message": f"error deleting clause from smart contract:{e=}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class GeneratePDFPreviewView(APIView):
    """
    Generate PDF preview for smart contract view
    """
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [JWTAuthentication,]

    def get(self, request, contract_id):
        try:
            contract = SmartContract.objects.get(id=contract_id)
            parties = contract.party_set.all()
            clauses = contract.clause_set.all()
            
            template = get_template('contract.html')
            html = template.render({
                'contract': contract,
                'parties': parties,
                'clauses': clauses,
            })
            pdf = pdfkit.from_string(html, False, options={
                'page-size': 'Letter',
                'encoding': "UTF-8",
            })
            
            response = HttpResponse(pdf, content_type='application/pdf')
            response['Content-Disposition'] = 'attachment; filename="contract.pdf"'
            # response['Content-Disposition'] = 'attachment'
            # response['Content-Disposition'] = 'inline'
            
            # response = FileResponse(pdf, as_attachment=True, filename=f'{contract.name}.pdf')
            return response
        except Exception as e:
            print(f'{e=}')
            return Response(
                {"message": f"error generating pdf preview:{e=}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            