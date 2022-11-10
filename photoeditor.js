const fileInput = document.querySelector(".file-input"),
 filterOptions = document.querySelectorAll(".filter button"),
 filterName = document.querySelector(".filter-info .name"),
 filterValue = document.querySelector(".filter-info .value"),
 filterSlider = document.querySelector(".slider input"),
 rotateOptions = document.querySelectorAll(".rotate button"),
 previewImag = document.querySelector(".preview-img img"),
 resetFilterBtn = document.querySelector(".reset-filter");
 chooseImgBtn = document.querySelector(".choose-img");
 saveImgBtn = document.querySelector(".save-img");



let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0,flipHorizontal = 1 , flipVertical = 1 ;
const applyfilters = () => {
    previewImag.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical} )` ;
    previewImag.style.filter = `brightness(${brightness}%) saturate(${saturation}%)  invert(${inversion}%) grayscale(${grayscale}%) `
}

 const loadImage = () => {
    let file = fileInput.files[0]; //getting user selected file
    if(!file) return;
    previewImag.src = URL.createObjectURL(file);
    previewImag.addEventListener("load",() => {
        document.querySelector(".container").classList.remove("disable");
    });
 }

 filterOptions.forEach(option => {
    option.addEventListener("click",() =>{
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id ==="brightness")
        {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`
        }
        else if (option.id ==="saturation")
        {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`
        }
        else if (option.id ==="inversion")
        {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`
        }
        else
        {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`
        }
    });
 });
 const updateFilter = () => {
    filterValue.innerText =   `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active"); //getting selected filter btn

    if(selectedFilter.id === "brightness")
    {
        brightness = filterSlider.value;
    }
    else if(selectedFilter.id === "saturation")
    {
        saturation = filterSlider.value;
    }
    else if(selectedFilter.id === "inversion")
    {
        inversion = filterSlider.value;
    }
    else{
        grayscale = filterSlider.value;
    }
    applyfilters();
 }

rotateOptions.forEach(option =>{
    option.addEventListener("click",() => {
    // adding click event listener to all rotate/filp buttons
    if(option.id == "left")
    {
        rotate -= 90; // if clicked btn is left rotate, decrement rotate value by -90

    }
    else if(option.id == "right")
    {
        rotate += 90; // if clicked btn is right rotate, increment rotate value by +90

    }
    else if(option.id == "horizontal")
    {
        flipHorizontal = flipHorizontal === 1 ? -1 : 1;

    }
    else{
        flipVertical = flipVertical == 1 ? -1 : 1;
    }
    applyfilters();
    });
} );
const resetFilter = () => {
    // reseting all veriable value to its default values
     brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
     rotate = 0,flipHorizontal = 1 , flipVertical = 1 ;
     filterOptions[0].click(); //clicking brightness btn, so the  brightness selected by defaukt 
     applyfilters();
}
const saveImgage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImag.naturalWidth;
    canvas.height = previewImag.naturalHeight;
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%)  invert(${inversion}%) grayscale(${grayscale}%) `;
    ctx.translate(canvas.width / 2,canvas.height / 2); // translate canvas from center
    if(rotate !== 0)
    {
        ctx.rotate(rotate * Math.PI/180);
    }
    ctx.scale(flipHorizontal,flipVertical);  
    ctx.drawImage(previewImag,-canvas.height/2,-canvas.width/2,canvas.width,canvas.height);
    // document.body.appendChild(canvas);

    const link = document.createElement("a"); //creating <a> element
    link.download = "image.jpg"; // passing <a> tag download value to "image.jpg"
    link.href =canvas.toDataURL(); //passing <a> tag href value to canvas data url
    link.click(); // clicking <a> tag so the download


}
fileInput.addEventListener("change",loadImage)
filterSlider.addEventListener("input",updateFilter);
resetFilterBtn.addEventListener("click",resetFilter);
saveImgBtn.addEventListener("click",saveImgage);
chooseImgBtn.addEventListener("click",() => fileInput.click());
 