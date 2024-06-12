<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            "id"=> $this->id,
            "name"=> $this->name,
            "description"=> $this->description,
            "status"=> $this->status,
            "image_path"=> $this->image_path,
            "priority"=> $this->priority,
            "due_date" => $this->due_date,
            "project"=>$this->projects? new ProjectResource($this->projects):null,
            "created_by"=> new UserResource($this->createdBy),
            "updated_by"=> new UserResource($this->updatedBy),
            "assigned_user"=> $this->assignedUser? new UserResource($this->assignedUser): null,
            "created_at"=> $this->created_at->format('Y-m-d'),
            "updated_at"=> $this->updated_at->format("Y-m-d"),
        ];
    }
}
