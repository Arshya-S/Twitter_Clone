from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Tweet

User = get_user_model()
class TweetTestCase(TestCase):
  def setUp(self):
    User.objects.create_user(usernamne='abc', password='123')

  def test_tweet_created(self):
    tweet = Tweet.objects.create(content='my tweet', user=self.user)
    self.assertEqual(tweet.id, 1)
    self.assertEqual(tweet.user, self.user)
    
