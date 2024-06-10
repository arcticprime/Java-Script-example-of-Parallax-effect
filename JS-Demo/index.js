const track = document.getElementById("image-track");

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
};

window.onmouseup = () => {
    track.dataset.mouseDownAt = '0';
    track.dataset.prevPercentage = track.dataset.percentage;
};

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === '0') return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX; 
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    
    let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    nextPercentage = Math.min(nextPercentage, 0);
    nextPercentage = Math.max(nextPercentage, -100);

    track.dataset.percentage = nextPercentage;

    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    for(const image of track.getElementsByClassName("image")) {
        image.style.objectPosition = `${nextPercentage + 100}% 50%`;
    }
};