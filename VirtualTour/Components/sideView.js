AFRAME.registerComponent("side-view", {
    init: function(){
        this.createPositions()
    },

    tick: function(){
        const placesContainer = document.querySelector("#places-container")  
        const {state} = placesContainer.getAttribute("tour")

        if(state == "view" || state == "change-view"){
            this.el.setAttribute("visible", true)
        } else {
            this.el.setAttribute("visible", false)
        }
    },

    createPlacesIcon: function(position, id){
        const entityEl = document.createElement("a-entity")
        entityEl.setAttribute("visible", true)
        entityEl.setAttribute("geometry", {primitive: "circle", radius: 3})
        entityEl.setAttribute("material", {src: "../Images/helicopter.png"})
        entityEl.setAttribute("position", position)
        entityEl.setAttribute("cursor-listener", {})
        entityEl.setAttribute("id", `place-${id}`)
        
        return entityEl
    },

    createPositions: function(){
        const sideViewContainer = document.querySelector("#side-view-container")

        let previousX = -30
        let previousY = 30
        
        for(var i = 0; i <= 4; i++){
            const position = {
                x: (previousX += 10),
                y: (previousY += 2),
                z: -40
            }

            const entityEl = this.createPlacesIcon(position, i)
            sideViewContainer.appendChild(entityEl)
        }
    }
})