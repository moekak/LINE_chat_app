<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Log;
use Illuminate\View\Component;

class OverlayImage extends Component
{
    /**
     * Create a new component instance.
     */
    public $src;
    public $link;
    public $cropData;
    public $message;
    
    public function __construct($src, $link, $message, $cropData = null)
    {
        $this->src = $src;
        $this->link = $link;
        $this->cropData = $cropData;
        $this->message = $message;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.overlay-image');
    }
}
