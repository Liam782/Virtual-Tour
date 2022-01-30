AFRAME.registerComponent("tour", {    
    schema:{
        state:{
            type: "string",
            default: "places-list"
        },
        selectedCard:{
            type: "string",
            default: "#card1"
        }
    },

    init:function(){
        this.placesContainer = this.el
        this.createCards()
    },

    tick: function(){
        const{state} = this.el.getAttribute("tour")

        if(state == "view") {
            this.hideEl([this.placesContainer])
            this.showView()
        }
    },

    hideEl: function(eList){
        eList.map(el => {
            el.setAttribute("visible", false)
        })
    },

    showView: function(){
        const {selectedCard} = this.data

        const skyEl = document.querySelector("#main-container")
        skyEl.setAttribute("material", {src: `./Scenes/${selectedCard}/place-3.jpg`, color: "white"})
    },

    createCards:function(){
        const thumbnailRef = [
            {  
                id: "budapest",
                title: "Budapest",
                url: "../Thumbnails/budapest.jpg"
            },

            {
                id: "taj-mahal",
                title: "Taj Mahal",
                url: "../Thumbnails/taj_mahal.png"
            },

            {
                id: "new-york-city",
                title: "New York City",
                url: "../Thumbnails/new_york_city.png"
            },

            {
                id: "eiffel-tower",
                title: "Eiffel Tower",
                url: "../Thumbnails/eiffel_tower.jpg"
            },
        ]
       
        let preX = -60;
        for (var item of thumbnailRef){
            var posX = preX +25;
            var posY = 10;
            var posZ = -40;
            
            const position = {x: posX, y: posY, z: posZ}
            preX = posX
            console.log(item.url)
            const thumbNail = this.createThumbnail(item, position)

            const borderEl = this.createBorder(item.id, position)
            borderEl.appendChild(thumbNail)

            const titleEl = this.createTitle(item, position)
            borderEl.appendChild(titleEl)

            this.placesContainer.appendChild(borderEl)
            
        }
    },

    createThumbnail:function(item){
        const entityEl = document.createElement("a-entity")

        entityEl.setAttribute("visible", true)
        entityEl.setAttribute("geometry", {primitive: "circle", radius: 9})
        entityEl.setAttribute("material", {src: item.url})

        return entityEl
    }, 

    createBorder:function(id, position){
        const entityEl = document.createElement("a-entity")
        const elPos = position;

        entityEl.setAttribute("id", id)
        entityEl.setAttribute("visible", true)
        entityEl.setAttribute("geometry", {primitive: "ring", radiusInner: 9, radiusOuter: 9.5})
        entityEl.setAttribute("material", {color: "black", opacity: 1})
        entityEl.setAttribute("position", elPos)
        entityEl.setAttribute("cursor-listener", {})

        return entityEl
    },

    createTitle:function(item, position){
        const entityEl = document.createElement("a-entity")
        const elPos = position;
        elPos.y = -15

        entityEl.setAttribute("visible", true)
        entityEl.setAttribute("text", {value: item.title, align: 'center', width: 100, color: "black"})
        entityEl.setAttribute("position", elPos)

        return entityEl
    }
})