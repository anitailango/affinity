from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import AffinityUser

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = AffinityUser
        fields = ('email',)

class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm):
        model = AffinityUser
        fields = ('email',)
