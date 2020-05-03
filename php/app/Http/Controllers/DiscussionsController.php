<?php

namespace App\Http\Controllers;

use Auth;
use DB;
use Illuminate\Http\Request;

class DiscussionsController extends Controller
{
    protected $_discussionTypes = [
        'random',
        'stocks',
    ];

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function renderDiscussions(Request $request)
    {
        $discussions = DB::table('discussions')
            ->orderBy('id', 'desc')
            ->get();
        foreach ($discussions as &$discussion) {
            $discussion_comments = DB::table('discussion_comments')
                ->select('users.username as username', 'discussion_comments.created_at as created_at', 'discussion_comments.content as content')
                ->join('users', 'users.id', '=', 'discussion_comments.user_id')
                ->where('discussion_id', '=', $discussion->id)
                ->orderBy('discussion_comments.id', 'desc')
                ->get();
            $discussion->comments = $discussion_comments;
            $user = DB::table('users')
                ->select('username')
                ->where('id', '=', $discussion->user_id)
                ->first();
            $discussion->username = $user->username;
        }
        $user = Auth::user();
        return view('discussions', [
            'discussions' => $discussions,
            'user' => $user,
        ]);
    }

    public function renderNewDiscussion(Request $request)
    {
        return view('new_discussion');
    }

    public function postDiscussion(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'discussion_title' => 'string',
            'discussion_type' => 'string',
        ]);
        if (!in_array($request->input('discussion_type'), $this->_discussionTypes)) {
            return back()
                ->with('error', 'Invalid discussion type!');
        }
        DB::table('discussions')->insert([
            'user_id' => $user->id,
            'discussion_type' => $request->input('discussion_type'),
            'title' => $request->input('discussion_title'),
            'created_at' => date('Y-m-d H:i:s'),
        ]);
        // Render discussions page
        return redirect('discussions')
            ->with('success', 'Successfully added new discussion.');
    }

    public function getComments(Request $request, $discussion_id)
    {
        $comments = DB::table('discussions')
            ->where('id', '=', $post_id)
            ->join('discussion_comments', 'discussion_comments.discussion_id', '=', 'discussions.id')
            ->join('users', 'discussion_comments.user_id', '=', 'users.id')
            ->get();
        return $comments;
    }

    public function renderNewComment(Request $request, $discussion_id)
    {
        $discussion = DB::table('discussions')
            ->where('discussions.id', '=', $discussion_id)
            ->join('users', 'discussions.user_id', '=', 'users.id')
            ->select('discussions.title as title', 'users.username as username')
            ->first();
        $discussion->id = $discussion_id;
        return view('new_comment', [
            'discussion' => $discussion,
        ]);
    }

    public function postComment(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'discussion_id' => 'exists:discussions,id',
            'comment' => 'string',
        ]);

        DB::table('discussion_comments')->insert([
            'discussion_id' => $request->input('discussion_id'),
            'user_id' => $user->id,
            'content' => $request->input('comment'),
            'created_at' => date('Y-m-d H:i:s'),
            'header' => '',
        ]);

        return redirect('discussions')
            ->with('success', 'Successfully added a new comment');
    }
}
