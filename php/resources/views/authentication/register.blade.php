<p>Already have an account? Please <a href="/login">Login</a>.</p>
    <form method="post" action="/register">
        @csrf
        <div class="form-group">
            <label for="name">Username</label>
            <input type="text" id="name" name="name" class="form-control">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" class="form-control">
        </div>
        <input type="submit" value="Sign Up" class="btn btn-primary">
    </form>
