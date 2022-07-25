# Introduction

## Contributors

- Barış İnandıoğlu [@baris-inandi](https://github.com/baris-inandi)
- Yiğit Kerem Oktay [@yigitkeremoktay](https://github.com/yigitkeremoktay)
- Alp Niksarlı [@alpnix](https://github.com/alpnix)

## What is SkinScan?

SkinScan is a service aiming to provide affordable solutions to people with dermatological
issues. Skin diseases make up a substantial portion of the problems global health is
currently facing. To be more precise, according to aad.org, in the US, more than 16 million
people are suffering with Rosacea and over 7.5 million people deal with Psoriasis.
Hearing stories about extended waits in hospitals and hardly ever getting certain results is
sadly not all that uncommon. Not to mention the amount of money spent on hospitals. As
team line0, we all kept this specific problem in mind while designing and prototyping our
product, SkinScan.
Our product offers quick and early diagnosis of dermatological conditions. In order to use
our product, the users will be able to download our application to their device. Once they
open the app, they will be prompted to take a picture of the skin area they are having
problems with.
Afterwards, our AI technology will analyze the sample it received and try to diagnose the
condition as accurately as possible. If needed, the app will prompt the user to answer
follow-through questions such as "Do you feel burning in the area?" or "Is the area
itchy?" to get a better understanding of the case.
Once the results are received, they will be displayed on the screen in a clear and concise
manner. The users will have easy access to pages where they can find information such as
symptoms, complications, and treatments of the diagnosed condition.
The entire process, from a user downloading the app to getting their results, is to take just
minutes. Notably, we are trying to offer the fastest diagnosis possible without needing to
go to a hospital. In addition, through collaboration with experts in dermatology, the AI
model can be trained, and improved over time to the point that it can become a viable way
of formal and accurate diagnosis that can actually result with treatment for the patient.
As some of our future plans for our product, we are considering making the API public,
opening it up for the use of third parties with a subscription model. In that case, the
images/data sent by third parties can be used as source material in future AI training,
similar to what is being done with captchas today.

## The Problem, Solution, and Target Group

We have a mission to make dermatology easier. We know that health systems across the
world can be very painful and expensive. From unacceptable waiting times and expensive
doctor visits and/or prescriptions, healthcare has a lot of aspects that can be improved.
With the rise of AI technology in the past years, we have the power to enhance every
aspect of our lives, now more than ever. That is why SkinScan is a better alternative to the
current system when it comes to healthcare. AI has the power to analyze and compare
images so why not use it for diagnosis of dermatological conditions? Over time, our AI has
the potential to become a way to cheaply and accurately diagnose conditions and help the
patients get help immediately, getting rid of all the tedious and time-consuming parts
when trying to get access to proper healthcare.
Our service targets those who seek immediate help and early diagnosis as our product will
provide much quicker results than one can get by going to hospital. In addition, our target
audience will include the ones who are looking for cheaper solutions to dermatological
issues since we will always be offering cheap, and affordable solutions for a better future
in global health.

## An In-Depth Study of SkinScan

How will the service be beneficial to line0?
The AI model that will power this app will initially be trained via thousands of samples of
dermatological diseases from the internet. As the scans are completed and the app turns
into profit, our team could hire dermatologists who could review the AI’s decisions after a
while to be periodically contributed to the neural network as training data. This means our
app will get more intelligent with time. As the app grows, we will be able to improve our
model.

## The Current Status of The Project

Our team has started preparing the app’s UI and UX design using the prototyping tool
Figma using the UI principles loosely based on Google’s Material UI 3. This UI prototype
contains the flow of the user from the start screen of the app to the submission screen
and the follow-through questions.
We have also gone ahead and scaffolded a simple backend, namely our API that can get
these images submitted from the app which is currently only in the prototyping phase,
and convert it into an OpenCV compatible format to be further used in conjunction with
PyTorch/Tensorflow and then return a dummy result of a predefined disease with
predefined questions.

## Example JSON

```json
// Example API output, subject to change
{
    "results": {
        "Psoriasis": {
            "id": 0,
            "out": 0.53, // 53% accuracy
            "wiki": {
                ...
            } // more info for insights page
        },
        "Rosacea": {
            "id": 1,
            "out": 0.16
        }
    },
    "follow-through": {
        "Do you feel burning in the area?": 0,
        "Is the area itchy?": 1 // in favor of result with ID 1
    }
}
```

A simplified version of the data set that will be used to identify images has been generated
using 200 images each for 2 diseases and a neutral case. Currently the images have been
grabbed by google via automations and then hand-picked manually from images that
aren’t confirmed to be the cases of these diseases. The production data will use more
reliable samples of the diseases which have been previously confirmed by experts.
In addition, the planning of the tech stack and the API methods and parameters as well as
JSON response structure have been completed which we will be updating with minor
changes and touching up as the app is built.

## The Tech Behind It

There are two major aspects in regard to the development of our service: the mobile app
and the AI API.
We chose Flutter (subject to change, replaced with ionic react) as our framework of choice for our mobile app. On the client side, after
letting users sign in with SSO using the OAuth protocol, they will be able to send requests
to our API through a HTTP POST request with the OAuth token being the authentication
header. The data returned will be presented to the user through our app. Effectively, the
frontend will let the users submit a picture of their skin.
The second aspect is our Python/FastAPI API. After the server verifies the OAuth token
through the identity provider, it will temporarily save the sent image and add it to an SQL
database. A separate Python process will be dedicated to running the image classification.
When a new image is added, this process will load the image, and then use OpenCV and
TensorFlow/PyTorch (subject to change) to classify the image using our AI model. When
the classification is complete, the API will return JSON with match percentages of images
for use in the frontend. The API will also implement features to improve on the end user
experience. For example, in cases where the percentage of accuracy is low or the gap
between percentage of accuracies are too low, the API will return follow up-questions as
well for the client-side to use in order to increase the accuracy of the result.
In practice, the user will be able to take a photo of their sample, answer a few questions if
needed, and see their results. In addition, they will be able to gain insight through the
condition’s dedicated page with info such as symptoms, complications, and treatments.

## More Resources

- Project Drive link: <https://drive.google.com/drive/folders/1bj3r-M8NyBCrgWyyBnRNpZGI_wCkUgCo>
- GitHub repository: <https://github.com/baris-inandi/skinscan>
- Figma design link: <https://www.figma.com/file/wOYpIffc3C8dTDzUTwUhiY/SkinScan>

## UI/UX Design

Most of our design choices were loosely inspired by Googles Material v3 design
guidelines. The design of the app is both intended to look professional with a modern
twist. The design puts legibility and usability first. User experience (UX) is a huge part of
our design system. We are keeping the user interface (UI) as simple as possible for users
to find each resource easy on the interface. Similarly, the interface we used for taking a
photo allows our users to comfortably tap anywhere on the screen whenever they capture
the skin area they want to examine.
Our color scheme relies on the study of color psychology. Colors like tan and pink play a
huge role for evoking feelings such as warmth and calmness in our users. In addition, the
usage of tan color tones similar to tones of the human skin helps convey the nature of our
service and implies that it is human at its core.
In short, these design principles make up the prototyped we designed. The designs and
renders are linked in the document under the “More Resources” section.

## Ideal Outcome

### Deliverables

By the end of the hackathon, we aim to have a cross platform mobile app which our users
will interact with. The app will have functionalities such as uploading an image, prompting
users’ questions related to their possible disease, and displaying the results of users.
Another component we are working on is an application programming interface (API)
which will constantly communicate back and forth with our mobile app. The API will be
responsible for analyzing the image submitted by the user to figure out which disease it is
that they are more likely to possess.

### How likely is the test to be successful?

In the current stage of our development, we believe our chances of being successful is
around 6 out of 10. We are aware that our success will depend on multiple factors, some
of which are in our hands, some of which aren't. Even though we are willing to put in the
hard work for our product to be successful, we will also need medical experts'
collaboration and financial support in order to pull this project to a level of our desired
success.
