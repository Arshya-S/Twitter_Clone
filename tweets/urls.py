from django.urls import path
from .views import (
  tweet_detail, 
  tweet_list,
  tweet_create,
  tweet_delete,
  tweet_action
)

urlpatterns = [
    path('', tweet_list),
    path('action/', tweet_action),
    path('create/', tweet_create),
    path('<int:tweet_id>/', tweet_detail),
    path('<int:tweet_id>/delete/', tweet_delete),
]
