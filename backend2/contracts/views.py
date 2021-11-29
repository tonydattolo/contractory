from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import authentication, generics, status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.mail import send_mail

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
            smartContract = SmartContract.objects.get(pk=id)
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
    def post(self, request, id):
        try:
            invitingParty = request.user
            newParty = request.data['newParty']
            newPartyRole = request.data['newPartyRole']
            newPartyInviteMessage = request.data['newPartyInviteMessage']
            print(f'{invitingParty=}, {newParty=}, {newPartyRole=}, {newPartyInviteMessage=}')
            
            if not invitingParty or not newParty or not newPartyRole or not newPartyInviteMessage:
                return Response({"message": "Missing fields"}, status=status.HTTP_400_BAD_REQUEST)
            
            smartContract = SmartContract.objects.get(id=id)
            
            if smartContract.status == "live" and newPartyRole != "viewer":
                return Response({"message": "Cannot invite an active party to a live smart contract"}, status=status.HTTP_400_BAD_REQUEST)
            if smartContract.status == "completed" and newPartyRole != "viewer":
                return Response({"message": "Cannot invite an active party to a completed smart contract"}, status=status.HTTP_400_BAD_REQUEST)
            
            # handle if the inviting party is not a party to the smart contract
            if not smartContract.party_set.filter(user=invitingParty).exists():
                return Response(
                    {"message": "You are not a party to this smart contract"},
                    status=status.HTTP_400_BAD_REQUEST)
            
            # handle if the user is already a party
            if smartContract.party_set.filter(party=newParty).exists():
                return Response(
                    {"message": "This person is already a party on this contract"},
                    status=status.HTTP_400_BAD_REQUEST)
                
            # handle if the newParty user is not already signed up
            if not USER.objects.filter(email=newParty).exists():
                return Response(
                    {"message": "This person is not signed up"},
                    status=status.HTTP_404_NOT_FOUND)
            
            # handle if newParty user is signed up, but not verified
            if not USER.objects.filter(email=newParty, is_verified=True).exists():
                return Response(
                    {"message": "This person is not verified"},
                    status=status.HTTP_412_PRECONDITION_FAILED)
            
            
            
            try:
                send_mail(
                    subject="You've been invited to a Smart Contract",
                    message=f'{invitingParty.email} has invited you to be a {newPartyRole} party, \
                    on the {smartContract.name} smart contract',
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[newParty],
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