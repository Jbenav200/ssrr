from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit
from django import forms


class ExampleForm(forms.Form):
    search_by_name = forms.CharField(
        label='Search for a Meteorite',
        max_length=200,
        required=True,
    )

    def __init__(self, *args, **kwargs):
        super(ExampleForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper
        self.helper.form_id = 'id-example-form'
        self.helper.form_class = 'blueForms'
        self.helper.form_method = 'post'
        self.helper.form_action = 'submit_survey'

        self.helper.add_input(Submit('submit', 'Submit'))
