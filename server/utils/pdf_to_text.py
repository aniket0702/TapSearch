import os
from time import time
import pytesseract
from pdf2image import convert_from_path


def extract_text(pdf_path):
	start = time()
	pages = convert_from_path(pdf_path, 500)
	total_pages = len(pages)

	for i, page in enumerate(pages):
			image_name = str(i) + '.jpg'
			page.save(image_name, 'JPEG')

	text = ''
	for i in range(total_pages):
		image_name = str(i) + '.jpg'
		text += pytesseract.image_to_string(image_name, nice=1, lang='eng', config='--psm 6')
		os.remove(image_name)

	print("OCR in time:",  time() - start)
	
	return text

