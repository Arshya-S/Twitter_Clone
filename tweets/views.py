from django.shortcuts import render
from django.http import JsonResponse
from .models import Tweet
from .forms import TweetForm
import random


# Create your views here.
def home(request, *args, **kwargs):
   return render(request, "pages/home.html", context={}, status = 200)

def tweet_detail(request, tweet_id, *args, **kwargs):
    data = {
       "id": tweet_id,
    }
    
    status = 200
    
    try:
      tweet_by_id = Tweet.objects.get(id=tweet_id)
      data['content'] = tweet_by_id.content
    except:
       data['message'] = "Not Found"
       status = 404
      
    return JsonResponse(data, status = status)


def tweet_create(request, *args, **kwargs):
   form = TweetForm(request.POST or None)
   
   if form.is_valid():
      obj = form.save(commit=False)
      obj.save()
      form = TweetForm()
   
   return render(request, 'components/form.html', context={"form": form})

def tweet_list(request, *args, **kwargs):
   query_set = Tweet.objects.all()
   tweets_list = [{"id": tweet.id, "content": tweet.content, 'likes': random.randint(0,10000)} for tweet in query_set]

   data = {
      "isUser": False,
      "response": tweets_list
   }

   return JsonResponse(data)