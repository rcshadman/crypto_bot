from rest_framework import status, permissions, authentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from main_app.models import Alert
from main_app.serializers import AlertSerializer

# TODO 
# - Add views to active / deactivate alerts
# - In AlertDetail make put() dynamic

# Handle general request as :
# - Get all alerts by owner
# - Create an alert
class AlertList(APIView):

    # authentify by token or session ( for the superuser )
    authentication_classes = (
        JSONWebTokenAuthentication,
        authentication.SessionAuthentication
    )
    
    # Every authentify user can have alerts
    permission_classes = (permissions.IsAuthenticated,)

    # Return all user's alerts
    def get(self, request, format=None):
        alerts = Alert.objects.filter(owner=request.user.id)
        serializer = AlertSerializer(alerts, many=True)
        return Response(serializer.data)

    # Create an alert
    def post(self, request, format=None):
        serializer = AlertSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=
                status.HTTP_400_BAD_REQUEST)
        else:
            data = serializer.data

            # Automaticly set the current user as owner
            owner = request.user

            crypto_currency=data['crypto_currency']
            exchange_currency=data['exchange_currency']
            operator=data['operator']
            limit=data['limit']

            alert = Alert(
              owner=owner,
              crypto_currency=crypto_currency,
              exchange_currency=exchange_currency,
              operator=operator,
              limit=limit,
            )
            alert.save()
            request.data['id'] = alert.pk # return id
            return Response(request.data, status=status.HTTP_201_CREATED)

# Handle specific request as :
# - Get an alert by id and owner
# - Modify an alert
# - Delete an alert
class AlertDetail(APIView):

    # authentify by token or session ( for the superuser )
    authentication_classes = (
        JSONWebTokenAuthentication,
        authentication.SessionAuthentication
    )
    
    # Every authentify user can have alerts
    permission_classes = (permissions.IsAuthenticated,)

    # We find our alert by owner and id
    def get_alert(self, user, pk):
        try:
            return Alert.objects.get(pk=pk, owner=user)
        except Alert.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        alert = self.get_alert(request.user, pk)
        serializer = AlertSerializer(alert)
        return Response(serializer.data)

    # Modify an alert by id
    # TODO - Make it dynamic
    # Now all field are still mandatory
    def put(self, request, pk, format=None):
        alert = self.get_alert(request.user, pk)
        serializer = AlertSerializer(alert, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete an alert by id
    def delete(self, request, pk, format=None):
        alert = self.get_alert(request.user, pk)
        alert.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

            

