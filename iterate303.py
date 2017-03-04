import numpy as np
from math import exp, expm1, log1p

class Current():
	"""docstring for currentOne"""
	def __init__(self):
		super(Current, self).__init__()
		

	def currentOne(self, volts=0.0):
		self.volts = volts
		satCurrent = (10.0)**-12
		vT = .0259
		total = (satCurrent)*(exp(volts/vT) - 1.0)
		print("current 1:", total)

	def currentTwo(self, volts=0.0, source=0.0, resist=0.0):
		self.volts = volts
		self.source = source
		self.resist = resist
		vSource = source
		resistance = resist
		total = (vSource-volts)/resistance
		print("current 2:", total)


if __name__ == '__main__':
	
	current = Current()
	source = float(input("Source Voltage: "))
	resist = float(input("Resistance: "))
	volt = float(input("Volts: "))
	
	while(volt != -8):
		current.currentOne(volt)
		current.currentTwo(volt)
		volt = float(input("Volts:"))
		