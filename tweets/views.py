from django.shortcuts import render
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Tweet
from .serializers import TweetSerializer


ALLOWED_HOSTS = settings.ALLOWED_HOSTS



def home(request, *args, **kwargs):
   return render(request, "pages/home.html", context={}, status = 200)



# POST endpoint for creating tweets.
@api_view(['POST'])
def tweet_create(request, *args, **kwargs):
   serializer = TweetSerializer(data=request.POST)

   if serializer.is_valid(raise_exception=True):
      serializer.save(user=request.user)
      return Response(serializer.data, status=201)

      
   return Response({}, status=400)

# GET endpoint for getting all tweets.
@api_view(['GET'])
def tweet_list(request, *args, **kwargs):
   query_set = Tweet.objects.all()
   serializer = TweetSerializer(query_set, many=True)
   

   return Response(serializer.data, status=200)


# GET endpoint for getting tweet by id.
@api_view(['GET'])
def tweet_detail(request, tweet_id, *args, **kwargs):
   query_set = Tweet.objects.filter(id=tweet_id)
   if not query_set.exists():
      return Response({}, status=404)
   
   obj = query_set.first()
   serializer = TweetSerializer(obj)

   return Response(serializer.data, status=200)



# Pure django views:
# def tweet_create_pure_django(request, *args, **kwargs):
#    user = request.user
   
#    if not request.user.is_authenticated:
#       user = None
#       if request.is_ajax():
#          return JsonResponse({}, status=401)
#       return redirect(settings.LOGIN_URL)

#    form = TweetForm(request.POST or None)
#    next_url = request.POST.get("next") or None
   
#    if form.is_valid():
#       obj = form.save(commit=False)
#       # do other form related logic
#       obj.user = user
#       obj.save()
#       if request.is_ajax():
#          return JsonResponse(obj.serialize(), status=201) # 201 == created items
#       if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
#          return redirect(next_url)
#       form = TweetForm()
#    if form.errors:
#       if request.is_ajax():
#          return JsonResponse(form.errors, status=400)
      
#    return render(request, 'components/form.html', context={"form": form})

# def tweet_detail_pure_django(request, tweet_id, *args, **kwargs):
#     data = {
#        "id": tweet_id,
#     }
    
#     status = 200
    
#     try:
#       tweet_by_id = Tweet.objects.get(id=tweet_id)
#       data['content'] = tweet_by_id.content
#     except:
#        data['message'] = "Not Found"
#        status = 404
      
#     return JsonResponse(data, status = status)

# def tweet_list_pure_dango(request, *args, **kwargs):
#    query_set = Tweet.objects.all()
#    tweets_list = [tweet.serialize() for tweet in query_set]

#    data = {
#       "isUser": False,
#       "response": tweets_list
#    }

#    return JsonResponse(data)