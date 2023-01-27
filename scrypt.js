window.onload = function () {

    const parallax = document.querySelector('.parallax')

    if (parallax) {
        const content = document.querySelector('.parallax__container')
        const clouds = document.querySelector('.parallax__image__clouds')
        const mountains = document.querySelector('.parallax__image__mountains')
        const human = document.querySelector('.parallax__image__human')

        const forCloud = 40
        const forMountains = 20
        const forHuman = 10


        const speed = 0.05
        let positionX = 0,
            positionY = 0,
            coordXprocent = 0,
            coordYprocent = 0


        function setMouseParallax () {
            const distX = coordXprocent - positionX
            const distY = coordYprocent - positionY


            positionX += (distX * speed)
            positionY += (distY * speed)


            clouds.style.cssText = `transform: translate(${positionX/forCloud}%, ${positionY/forCloud}%)`
            mountains.style.cssText = `transform: translate(${positionX/forMountains}%, ${positionY/forMountains}%)`
            human.style.cssText = `transform: translate(${positionX/forHuman}%, ${positionY/forHuman}%)`


            requestAnimationFrame(setMouseParallax)
        }
        setMouseParallax()

        parallax.addEventListener('mousemove', function(event){
            console.log(event);
            const parallaxWidth = parallax.offsetWidth
            const parallaxHeight = parallax.offsetHeight

            const coordX = event.pageX - parallaxWidth / 2
            const coordY = event.pageY - parallaxHeight / 2

            coordXprocent = coordX / parallaxWidth * 100
            coordYprocent = coordY / parallaxHeight * 100
        })


        let threeholdSets = []
        for (let i = 0; i < 1.0; i += 0.005) {
            threeholdSets.push(i)            
        }


        const callBack = function (entries, observer){
            const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100
            setParallaxItems(scrollTopProcent)
        }

        const observer = new IntersectionObserver(callBack ,{
            threshold: threeholdSets
        })

        observer.observe(document.querySelector('.content'))

        function setParallaxItems(scrollTopProcent){
            clouds.style.cssText = `transform: translate(0%, ${scrollTopProcent/ 9}%)`
            mountains.style.cssText = `transform: translate(0%, ${scrollTopProcent/ 6}%)`
            human.style.cssText = `transform: translate(0%, ${scrollTopProcent/ 3}%)`
        }
    }
}