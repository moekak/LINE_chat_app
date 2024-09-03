<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MessageReadUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "message_id"=> ["required", "integer", "exists:user_messages,id"],
            "admin_id" => ["required", "integer", "exists:line_accounts,id"],
            "chat_user_id" => ["required", "integer", "exists:chat_users,id"],
        ];
    }
}