from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit
from django import forms
from .models import Meteorite
from django.urls import reverse


class ExampleForm(forms.Form):
    search_by_name = forms.CharField(
        label='Search for a Meteorite',
        max_length=200,
        required=True,
    )

    submit = Submit('submit', 'Search', css_class='btn-success')

    class Meta:
        model = Meteorite
        fields = [
            "name"
        ]

    def __init__(self, *args, **kwargs):
        super(ExampleForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_id = 'id-example-form'
        self.helper.form_class = 'blueForms'
        self.helper.form_method = 'GET'

        self.helper.add_input(self.submit)
