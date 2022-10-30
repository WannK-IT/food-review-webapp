<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Post extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'vote' => $this->vote,
            'rate' => $this->rate,
            'id_cat_post' => $this->id_cat_post,
            'id_user' => $this->id_user_id,
            'id_food_place' => $this->id_food_place,
            'place_name' => $this->place_name,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
