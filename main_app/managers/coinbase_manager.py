from coinbase.wallet.client import Client
import os

class CoinbaseManager(object):
  """Manager for the coinbase API"""

  def __init__(self):
    super(CoinbaseManager, self).__init__()
    self.api_key = os.environ.get('COINBASE_API_KEY')
    self.api_secret = os.environ.get('COINBASE_API_SECRET')
    self.client = Client(self.api_key, self.api_secret)

  def get_curreny_pair(self, crypto_currency, exchange_currency):
      """Return the currency pair to get the price from API"""
      currency_pair = '%s-%s' % (crypto_currency, exchange_currency)
      return currency_pair

  def get_spot_price(self, crypto_currency, exchange_currency):
      """Get the spot price from API"""
      currency_pair = self.get_curreny_pair(crypto_currency, exchange_currency)
      price = self.client.get_spot_price(currency_pair = currency_pair)
      return price.amount

  def get_buy_price(self, crypto_currency, exchange_currency):
      """Get the buy price from API"""
      currency_pair = self.get_curreny_pair(crypto_currency, exchange_currency)
      price = self.client.get_buy_price(currency_pair = currency_pair)
      return price.amount

  def get_sell_price(self, crypto_currency, exchange_currency):
      """Get the sell price from API"""
      currency_pair = self.get_curreny_pair(crypto_currency, exchange_currency)
      price = self.client.get_sell_price(currency_pair = currency_pair)
      return price.amount
    