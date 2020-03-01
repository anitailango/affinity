import json
import requests

def diffbotScrape(my_url):
    my_dict = {}
    diffbot = DiffbotClient()
    token = "b281b503b14a39254840556ed2f36309"
    url = my_url
    api = "analyze"
    response = diffbot.request(url, token, api, fields=['title', 'type'])

    return response
    my_dict[my_url] = response
    file = my_url + ".json"
    with open(file,  'a+') as f:
         json.dump(my_dict, f, sort_keys = True, indent = 4)

class DiffbotClient(object):

    def request(self, url, token, api, fields=None, version=3, **kwargs):
        """
        Returns a python object containing the requested resource from the diffbot api
        """
        params = {"url": url, "token": token}
        if fields:
            params['fields'] = fields
        params.update(kwargs)
        response = requests.get(self.compose_url(api, version), params=params)
        response.raise_for_status()
        return response.json()

    def compose_url(self, api, version_number):
        """
        Returns the uri for an endpoint as a string
        """
        version = self.format_version_string(version_number)
        return '{}{}/{}'.format(self.base_url, version, api)
