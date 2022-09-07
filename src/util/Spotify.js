const clientId = "7f59637fe0e04efb81c59156d85d28c3";
const redirectUrl = "http://localhost:3000";
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    let accessTokenMatch = window.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch;
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl =
        "https://accounts.spotify.com/authorize?clientid=${clientId}&response_type=token&scope=playlist-modify-public&redirect_url=${redirectUrl}";
      window.location = accessUrl;
    }
  },
  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch("https://api.spotify.com/v1/search?type=track&g=$(term)", {
      headers: {
        Authorization: "Bearer ${accessToken}",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          url: track.uri,
        }));
      });
  },
  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: "Bearer ${accessToken}" };
    let userId;

    return fetch("https://api.spotify.com/v1/me", { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId - jsonResponse.id;
        return fetch("https://api.spotify.com/v1/users/${userid}/playlists", {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        });
      })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const playlistId = jsonResponse.id;
        return fetch(
          "https://api.spotify.com/v1/users/${userid}/playlists/${playlistId}/tracks",
          {
            headers: headers,
            method: postMessage,
            body: JSON.stringify({ uris: trackUris }),
          }
        );
      });
  },
};
export default Spotify;