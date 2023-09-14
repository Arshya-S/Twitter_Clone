from django.shortcuts import render
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from .models import Tweet
from .serializers import TweetSerializer, TweetActionSerializer

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

def home(request, *args, **kwargs):
   return render(request, "pages/home.html", context={}, status = 200)


# POST endpoint for creating tweets.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_create(request, *args, **kwargs):
   serializer = TweetSerializer(data=request.POST)

   if serializer.is_valid(raise_exception=True):
      serializer.save(user=request.user)
      return Response(serializer.data, status=201)

   return Response({}, status=400)


# GET endpoint for getting all tweets.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
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

   serializer = TweetActionSerializer(request.POST)
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
   elif action == 'unlike':
      obj.likes.remove(request.user)
   elif action == 'retweet':
      pass

   return Response({'message': 'Tweet successfully deleted'}, status=200)



