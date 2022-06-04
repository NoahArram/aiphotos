from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
import base64
import numpy as np
from PIL import Image
import io
import cv2
import os

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['GET', 'POST'])
@cross_origin()
def recievedphoto():
    if request.method == 'POST':
        data = str(request.form.get("base64"))
        decoded_img = base64.b64decode(data)
        image_result = open('original_img.png', 'wb')
        image_result.write(decoded_img)
        # Take in base64 string and return PIL image
        imgdata = base64.b64decode(data)
        pilimg = Image.open(io.BytesIO(imgdata))
        cv2img = cv2.cvtColor(np.array(pilimg), cv2.COLOR_BGR2RGB)
        path = '/home/noaharram'
        cv2. imwrite(os. path. join(path , 'unedited.jpg'), cv2img)

        # convert from RGB color-space to YCrCb
        ycrcb_img = cv2.cvtColor(cv2img, cv2.COLOR_BGR2YCrCb)

        # equalize the histogram of the Y channel
        ycrcb_img[:, :, 0] = cv2.equalizeHist(ycrcb_img[:, :, 0])

        # convert back to RGB color-space from YCrCb
        equalized_img = cv2.cvtColor(ycrcb_img, cv2.COLOR_YCrCb2BGR)

        cv2. imwrite(os. path. join(path , 'edited.jpg'), equalized_img)

        img = cv2.imread('/home/noaharram/edited.jpg')
        _, im_arr = cv2.imencode('.jpg', img)  # im_arr: image in Numpy one-dim array format.
        im_bytes = im_arr.tobytes()
        im_b64 = base64.b64encode(im_bytes)
        return im_b64
    else:
        return "incorrect request type (use post)"
