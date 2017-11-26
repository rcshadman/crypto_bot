from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from main_app import views
 
urlpatterns = [
    # djoser url's
    # http://djoser.readthedocs.io/en/latest/
    # 
    # include urls relatived to users
    url(r'^', include('djoser.urls')),

    # the Alerts' urls
    url(r'^alerts/$', views.AlertList.as_view()),
    url(r'^alerts/(?P<pk>[0-9]*)$', views.AlertDetail.as_view()),

    # include jwt url
    url(r'^auth/', include('djoser.urls.jwt')),
]

urlpatterns = format_suffix_patterns(urlpatterns)
