from django.shortcuts import render
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from .models import Tweet
from .serializers import TweetSerializer, TweetActionSerializer, TweetCreateSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
   serializer_class = MyTokenObtainPairSerializer


# POST endpoint for creating tweets.
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def tweet_create(request, *args, **kwargs):
   print(request.data)
   serializer = TweetCreateSerializer(data=request.data)

   if serializer.is_valid(raise_exception=True):
      serializer.save(user=request.user)
      return Response(serializer.data, status=201)

   return Response({}, status=400)


# GET endpoint for getting all tweets.
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def tweet_list(request, *args, **kwargs):
   query_set = Tweet.objects.all()
   serializer = TweetSerializer(query_set, many=True)
   
   return Response(serializer.data, status=200)


# GET endpoint for getting tweet by id.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tweet_detail(request, tweet_id, *args, **kwargs):
   query_set = Tweet.objects.filter(id=tweet_id)
   
   if not query_set.exists():
      return Response({}, status=404)
   
   obj = query_set.first()
   serializer = TweetSerializer(obj)

   return Response(serializer.data, status=200)

# DELETE/POST endpoint for deleting tweet by id.
@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def tweet_delete(request, tweet_id, *args, **kwargs):
   
   query_set = Tweet.objects.filter(id=tweet_id)
   if not query_set.exists():
      return Response({}, status=404)
   
   query_set = query_set.filter(user=request.user)
   if not query_set.exists():
      return Response({'message': 'You do not have permission to delete this tweet.'}, status=401)
  
   obj = query_set.first()
   obj.delete()

   return Response({'message': 'Tweet successfully deleted'}, status=200)

# POST endpoint for liking tweets.
# Actions include: liking, unliking, retweeting
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_action(request, *args, **kwargs):
   serializer = TweetActionSerializer(data=request.data)
   if serializer.is_valid(raise_exception=True):
      data = serializer.validated_data
      tweet_id = data.get('id')
      action = data.get('action')

   query_set = Tweet.objects.filter(id=tweet_id)
   if not query_set.exists():
      return Response({}, status=404)

   obj = query_set.first()

   if action == 'like':
      obj.likes.add(request.user)
      serializer = TweetSerializer(obj)
      return Response(serializer.data, status=200)
   elif action == 'unlike':
      obj.likes.remove(request.user)
   elif action == 'retweet':
      new_tweet = Tweet.objects.create(user=request.user, parent=obj)
      serializer = TweetSerializer(new_tweet)
      return Response(serializer.data, status=200)

   return Response({}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request, *args, **kwargs):
   try:
      refresh_token = request.data["refresh_token"]
      token = RefreshToken(refresh_token)
      token.blacklist()
      return Response(status=205)
   except Exception as e:
      return Response(status=400)



