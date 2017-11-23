from django.contrib import admin
from main_app.models import Alert

class AlertAdmin(admin.ModelAdmin):
      # We exclude the done field and executed_at,
      # Because they will be setup when a alert is triggered
      exclude = ('done','executed_at','owner')

      # Check if the user has the perms to modify our deer Alert
      def has_change_permission(self, request, obj=None):
          has_class_permission = super(AlertAdmin, self).has_change_permission(request, obj)
          if not has_class_permission:
              return False
          if obj is not None and not request.user.is_admin and request.user.id != obj.owner.id:
              return False
          return True

      # When create an alert, automaticly add the user as owner
      # Logic no ?
      def save_model(self, request, obj, form, change):
          if not change:
              obj.owner = request.user
          obj.save()

      # In the admin only superuser can see everything
      def queryset(self, request):
          if request.user.is_admin:
              return Alert.objects.all()
          return Alert.objects.filter(owner=request.user)

# Register the models
admin.site.register(Alert, AlertAdmin)
