

from django.http import request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Posts
from rest_framework import generics, status, permissions
from .serializers import PostsSerializer

from profiles.models import Profile

from .permissions import IsAuthorOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication

# class CreatePostView(generics.CreateAPIView):
#     '''Create a post'''
#     queryset = Posts.objects.all()
#     serializer_class = PostsSerializer
#     authentication_classes = [permissions.IsAuthenticated]

#     def perform_create(self, serializer):
#         serializer.save(postAuthor=self.request.user)

class CreatePostView(APIView):
    '''Create a post'''
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        try:
            try:
                profile = Profile.objects.get(user__email=request.user)
            except Profile.DoesNotExist:
                return Response(
                    {'error':'profile not found'},
                    status=status.HTTP_404_NOT_FOUND
                )

            try:
                Posts.objects.create(postAuthor=profile, postText=request.data['post_text'])
                return Response(
                    {'success':'post created'},
                    status=status.HTTP_201_CREATED
                )
            except Exception as e:
                print(f'{e=}')
                return Response(
                    {'error':'problem creating post object'},
                    status=status.HTTP_406_NOT_ACCEPTABLE
                )
        except:
            return Response(
                {"error": "catchall error triggered on create post view"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )


class AllPostsListView(APIView):
    '''Get all posts'''
    permission_classes = [permissions.AllowAny,]

    def get(self, request):
        try:
            posts = Posts.objects.all().order_by('-created_at')
            print(f'{posts=}')
            serializer = PostsSerializer(posts, many=True)
            return Response(
                {'posts': serializer.data},
                status=status.HTTP_200_OK)
        except:
            return Response(
                {'message': 'Something went wrong loading all posts'},
                status=status.HTTP_404_NOT_FOUND)

class PostsListViewByAuthor(APIView):
    '''Get all posts by author'''
    permission_classes = [permissions.AllowAny]

    def get(self, request, email, format=None, *args, **kwargs):
        try:
            wantedUser = email
            if Posts.objects.filter(postAuthor__user__email=wantedUser).exists():
                posts = Posts.objects.filter(postAuthor__user__email=wantedUser).order_by('-created_at')
                serializer = PostsSerializer(posts, many=True)
                return Response(
                    {'posts': serializer.data},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'message': 'No posts found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        except Exception as e:
            return Response(
                {'message': 'error loading posts by author'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
class PostDetailView(generics.RetrieveAPIView):
    '''Get the details of a particular post'''
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,]
    def get(self, request, *args, **kwargs):
        post = self.get_object()
        serializer = PostsSerializer(post)
        return Response(serializer.data)

class PostUpdateView(generics.UpdateAPIView):
    '''Update a post'''
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer
    permission_classes = (IsAuthorOrReadOnly,)

# class PostDeleteView(generics.DestroyAPIView):
#     '''Delete a post'''
#     queryset = Posts.objects.all()
#     serializer_class = PostsSerializer
#     permission_classes = (IsAuthorOrReadOnly,)

class PostDeleteView(APIView):
    '''Delete a post'''
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def delete(self, request, id):
        try:
            # Posts.objects.delete(id=id)
            post = Posts.objects.get(pk=id)
            if post.postAuthor.user == request.user:
                post.delete()
                return Response(
                    {'message': 'Post deleted'},
                    status=status.HTTP_200_OK
                )
        except:
            return Response(
                {'message': 'post not found'},
                status=status.HTTP_404_NOT_FOUND
            )


############
# class PostsAPI(APIView):

#     permission_classes = [IsAuthorOrReadOnly]

#     def get(self,request,pk=None,format=None):
#         print(request.data)
#         try:
            
#             id = request.data.get("id",None)
#             if id is not None:
#                 # print("Inside")
#                 stu = Posts.objects.get(id=id)
#                 print(stu)
#                 serializer = PostsSerializer(stu)
#                 return Response(serializer.data,status=status.HTTP_200_OK)
#             stu = Posts.objects.all()
#             print(stu)
#             serializer = PostsSerializer(stu,many=True)
#             return Response(serializer.data,status=status.HTTP_200_OK)
#         except:
#             return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)

#     def post(self, request, format=None):
        
#         user_id = request.data.get("created_by")

#         user = Profile.objects.get(id=user_id)
#         # print(user)
#         # # request.data['created_by']=user
#         # print(request.data)

#         serialzer = PostsSerializer(data=request.data)
           
#         if serialzer.is_valid():
#             serialzer.save()
#             return Response({"msg":"Data Posted"},status=status.HTTP_201_CREATED)
#         return Response(serialzer.errors,status=status.HTTP_400_BAD_REQUEST)

#     def put(self,request,format=None):
#         try: 
#             id = request.data.get("id")
#             stu = Posts.objects.get(id=id)
#             serializer = PostsSerializer(stu,data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response({"msg":"Full/PUT Update Successfull"},status=status.HTTP_200_OK)
#             return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
#         except:
#             return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)

#     def patch(self,request,format=None):
#         try:
#             id = request.data.get("id")
#             stu = Posts.objects.get(id=id)
#             serializer = PostsSerializer(stu,data=request.data,partial=True)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response({"msg":"Partial/PATCH Update Successfull"},status=status.HTTP_200_OK)
#             return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
#         except:
#             return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)

#     def delete(self,request,format=None):
#         try: 
#             id = request.data.get("id")
#             stu = Posts.objects.get(id=id)
#             if stu:
#                 stu.delete()
#                 return Response({"msg":"Record Deleted Successfully"},status=status.HTTP_200_OK)
#             return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)
#         except:
#             return Response({"msg":"Something went wrong"},status=status.HTTP_404_NOT_FOUND)
                





