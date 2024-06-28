# Enjoy the Microblog Project and the MicroblogLite API!

Don't forget to read the [*MicroblogLite* API docs](http://microbloglite.us-east-2.elasticbeanstalk.com/docs) and experiment with the API in *Postman!*

Practice and experimentation provide experience, and experience provides confidence.

![Screenshot](https://github.com/MaximoMayo/microbloglite-capstone-starter/blob/main/images/1.png)

![Screenshot](https://github.com/MaximoMayo/microbloglite-capstone-starter/blob/main/images/2.png)

![Screenshot](https://github.com/MaximoMayo/microbloglite-capstone-starter/blob/main/images/3.png)




/*Keyframe animations */
@keyframes topToBottom {
    from {
        transform: translateY(-200px);
    }

    to{
        transform: translateY(0);
    }
}

@keyframes bottomToTop {
    from {
        transform: translateY(200px);
    }

    to{
        transform: translateY(0);
    }
}

@keyframes hiddenToShow {
    from {
        transform: translateX(-800px);
    }

    to{
        transform: translateX(0);
    }
}

@keyframes hiddenToShow2 {
    from {
        transform: translateX(800px);
    }

    to{
        transform: translateX(0);
    }
}

#header{
    animation: topToBottom 1s ease-in 0s 1 normal none;
}

#main{
    animation: bottomToTop 1s ease-in 0s 1 normal none;
}
img#firstT{
    animation: hiddenToShow 1s ease-in 0s 1 normal none;
}

img#secondT{
    animation: hiddenToShow2 1s ease-in 0s 1 normal none;
}
