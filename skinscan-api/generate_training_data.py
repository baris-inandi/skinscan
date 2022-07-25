import os
import cv2
import numpy as np
import matplotlib.pyplot as plt
import time

import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Model, load_model
from tensorflow.keras.layers import Dense,MaxPool2D,Dropout,Flatten,Conv2D,GlobalAveragePooling2D,Activation
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.utils import to_categorical

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

from random import choice,shuffle
from scipy import stats as st

from collections import deque
from pathlib import Path

healthy = []
eczema = []
gangrene = []
ichthyosis = []
vitiligo = []

def gather_data(num_samples):

    global healthy, eczema, gangrene, ichthyosis, vitiligo

    file = Path("data/healthy").glob('*')
    for i in file:
        image = cv2.imread(str(i))
        image = cv2.resize(image, (224,224))
        healthy.append([image, 'healthy'])

    file = Path("data/eczema").glob('*')
    for i in file:
        image = cv2.imread(str(i))
        image = cv2.resize(image, (224, 224))
        eczema.append([image, 'eczema'])

    file = Path("data/gangrene").glob('*')
    for i in file:
        image = cv2.imread(str(i))
        image = cv2.resize(image, (224, 224))
        eczema.append([image, 'gangrene'])

    file = Path("data/ichthyosis").glob('*')
    for i in file:
        image = cv2.imread(str(i))
        image = cv2.resize(image, (224, 224))
        eczema.append([image, 'ichthyosis'])

    file = Path("data/vitiligo").glob('*')
    for i in file:
        image = cv2.imread(str(i))
        image = cv2.resize(image, (224, 224))
        eczema.append([image, 'vitiligo'])



no_of_samples = 200
gather_data(no_of_samples)
# Set the figure size
plt.figure(figsize=[30,20])

# Set the rows and columns
rows, cols = 4, 8

# Iterate for each class
for class_index, each_list in enumerate([healthy,eczema]):
    
    # Get 8 random indexes, since we will be showing 8 examples of each class.
    r = np.random.randint(no_of_samples, size=8);
    
    # Plot the examples
    for i, example_index in enumerate(r,1):
        plt.subplot(rows,cols,class_index*cols + i );plt.imshow(each_list[example_index][0][:,:,::-1]);plt.axis('off');
        
# Combine the labels of all classes together
labels = [tupl[1] for tupl in healthy] + [tupl[1] for tupl in eczema] + [tupl[1] for tupl in gangrene] + [tupl[1] for tupl in ichthyosis] + [tupl[1] for tupl in vitiligo]

# Combine the images of all classes together
images = [tupl[0] for tupl in healthy] + [tupl[0] for tupl in eczema] + [tupl[0] for tupl in gangrene] + [tupl[0] for tupl in ichthyosis] + [tupl[0] for tupl in vitiligo]

# Normalize the images by dividing by 255, now our images are in range 0-1. This will help in training.
images = np.array(images, dtype="float") / 255.0

# Print out the total number of labels and images.
print('Total images: {} , Total Labels: {}'.format(len(labels), len(images)))

# Create an encoder Object
encoder = LabelEncoder()

Int_labels = encoder.fit_transform(labels)

# Now the convert the integer labels into one hot format. i.e. 0 = [1,0,0,0]  etc.
one_hot_labels = to_categorical(Int_labels, 5)

# Now we're splitting the data, 75% for training and 25% for testing.
(trainX, testX, trainY, testY) = train_test_split(images, one_hot_labels, test_size=0.25, random_state=50)

# Empty memory from RAM
images = []


# This can further free up memory from RAM but be careful, if you won't be able to change split % after this.
# rock, paper, scissor = [], [], []
# This is the input size which our model accepts.
image_size = 224

# Loading pre-trained NASNETMobile Model without the head by doing include_top = False
N_mobile = tf.keras.applications.NASNetMobile( input_shape=(image_size, image_size, 3), include_top=False, weights='imagenet')

# Freeze the whole model 
N_mobile.trainable = False
    
# Adding our own custom head
# Start by taking the output feature maps from NASNETMobile
x = N_mobile.output

# Convert to a single-dimensional vector by Global Average Pooling. 
# We could also use Flatten()(x) GAP is more effective reduces params and controls overfitting.
x = GlobalAveragePooling2D()(x)

# Adding a dense layer with 712 units
x = Dense(712, activation='relu')(x) 

# Dropout 40% of the activations, helps reduces overfitting
x = Dropout(0.40)(x)

# The fianl layer will contain 4 output units (no of units = no of classes) with softmax function.
preds = Dense(5,activation='softmax')(x)

# Construct the full model
model = Model(inputs=N_mobile.input, outputs=preds)

# Check the number of layers in the final Model
print ("Number of Layers in Model: {}".format(len(model.layers[:])))
# Adding transformations that I know would help, you can feel free to add more.
# I'm doing horizontal_flip = False, in case you aren't sure which hand you would be using you can make that True.

augment = ImageDataGenerator( 
    
        rotation_range=30,
        zoom_range=0.25,
        width_shift_range=0.10,
        height_shift_range=0.10,
        shear_range=0.10,
        horizontal_flip=False,
        fill_mode="nearest"
)
model.compile(optimizer=Adam(learning_rate=0.0001), loss='categorical_crossentropy', metrics=['accuracy'])
# Set batchsize according to your system
epochs = 10
batchsize = 20

# Start training
history = model.fit(x=augment.flow(trainX, trainY, batch_size=batchsize), validation_data=(testX, testY), 
steps_per_epoch= len(trainX) // batchsize, epochs=epochs)

# Use model.fit_generator function instead if TF version < 2.2
#history = model.fit_generator(x = augment.flow(trainX, trainY, batch_size=batchsize), validation_data=(testX, testY), 
#steps_per_epoch= len(trainX) // batchsize, epochs=epochs)
# Plot the accuracy and loss curves

acc = history.history['accuracy']
val_acc = history.history['val_accuracy']
loss = history.history['loss']
val_loss = history.history['val_loss']

epochs = range(len(acc))

plt.plot(epochs, acc, 'b', label='Training acc')
plt.plot(epochs, val_acc, 'r', label='Validation acc')
plt.title('Training accuracy')
plt.legend()

plt.figure()

plt.plot(epochs, loss, 'b', label='Training loss')
plt.plot(epochs, val_loss, 'r', label='Validation loss')
plt.title('Training loss')
plt.legend()

plt.show()
model.save("skinscan.h5")
