-- Create the profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  updated_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- This trigger automatically updates the `updated_at` column when a profile is updated
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();


-- Create the posts table
CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for faster sorting of the feed
CREATE INDEX posts_created_at_idx ON public.posts(created_at DESC);


-- Create the likes table
CREATE TABLE public.likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id, post_id) -- Critical constraint
);

-- Index for quickly getting all likes for a post
CREATE INDEX likes_post_id_idx ON public.likes(post_id);


-- Create the comments table
CREATE TABLE public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX comments_post_id_idx ON public.comments(post_id);


-- Create the follows table
CREATE TABLE public.follows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(follower_id, following_id) -- Prevents duplicate follows
);

-- Indexes for quickly getting a user's followers and who they are following
CREATE INDEX follows_follower_id_idx ON public.follows(follower_id);
CREATE INDEX follows_following_id_idx ON public.follows(following_id);


-- RLS
-- Anyone can view a profile
CREATE POLICY "Profiles are viewable by everyone."
  ON public.profiles
  FOR SELECT
  USING ( true );

-- Users can update their own profile
CREATE POLICY "Users can update their own profile."
  ON public.profiles
  FOR UPDATE
  USING ( auth.uid() = id );

  -- Anyone can view posts
CREATE POLICY "Posts are viewable by everyone."
  ON public.posts
  FOR SELECT
  USING ( true );

-- Users can insert their own posts
CREATE POLICY "Users can create posts."
  ON public.posts
  FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

-- Users can update their own posts
CREATE POLICY "Users can update their own posts."
  ON public.posts
  FOR UPDATE
  USING ( auth.uid() = user_id );

-- Users can delete their own posts
CREATE POLICY "Users can delete their own posts."
  ON public.posts
  FOR DELETE
  USING ( auth.uid() = user_id );

  -- Function that handles the trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger that fires after a user is created in auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();