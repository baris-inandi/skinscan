import cv2
from pathlib import Path
import os

files = Path("prep/in").glob("*")
for i in files:
    image = cv2.imread(str(i))
    print(i)
    cv2.imshow("ImgPrep", image)
    next = "roi"
    while True:
        if cv2.waitKey(1) & 0xFF == ord("a"):
            next = "roi"
            break
        if cv2.waitKey(1) & 0xFF == ord("s"):
            next = "skip"
            break
    os.unlink(i)
    if next == "roi":
        roi = cv2.selectROI("ImgPrep", image)
        roi_cropped = image[
            int(roi[1]) : int(roi[1] + roi[3]), int(roi[0]) : int(roi[0] + roi[2])
        ]
        roi_cropped = cv2.resize(roi_cropped, (224, 224))
        cv2.imwrite(str(i).replace("prep/in", "prep/out"), roi_cropped)
