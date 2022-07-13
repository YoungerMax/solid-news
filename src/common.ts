export const TOP_POSTS_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';
export const BEST_POSTS_URL = 'https://hacker-news.firebaseio.com/v0/beststories.json';
export const NEW_POSTS_URL = 'https://hacker-news.firebaseio.com/v0/newstories.json';
export const ASK_POSTS_URL = 'https://hacker-news.firebaseio.com/v0/askstories.json';
export const SHOW_POSTS_URL = 'https://hacker-news.firebaseio.com/v0/showstories.json';
export const JOB_POSTS_URL = 'https://hacker-news.firebaseio.com/v0/jobstories.json';

export const fetchUserData = async (username) => (await fetch(`https://hacker-news.firebaseio.com/v0/user/${username}.json`)).json();
export const fetchItemData = async (id) => (await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)).json();
