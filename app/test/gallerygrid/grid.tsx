import "./grid.module.css";

export default function Grid() {
    return (
       
<div className="gallery-container">
    <div className="gallery-item wide">
        <img src="https://via.placeholder.com/800x600" alt="Photo 1" />
    </div>
    <div className="gallery-item tall">
        <img src="https://via.placeholder.com/600x800" alt="Photo 2" />
    </div>
    <div className="gallery-item">
        <img src="https://via.placeholder.com/600x600" alt="Photo 3" />
    </div>
    <div className="gallery-item wide">
        <img src="https://via.placeholder.com/800x400" alt="Photo 4" />
    </div>
    <div className="gallery-item tall">
        <img src="https://via.placeholder.com/400x800" alt="Photo 5" />
    </div>
    <div className="gallery-item">
        <img src="https://via.placeholder.com/600x600" alt="Photo 6" />
    </div>
    <div className="gallery-item wide">
        <img src="https://via.placeholder.com/800x400" alt="Photo 7" />
    </div>
    <div className="gallery-item">
        <img src="https://via.placeholder.com/600x600" alt="Photo 8" />
    </div>
    <div className="gallery-item tall">
        <img src="https://via.placeholder.com/400x800" alt="Photo 9" />
    </div>
</div>

    )
}