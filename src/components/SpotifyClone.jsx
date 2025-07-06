import React, { useState, useRef, useEffect } from "react";
import "./SpotifyClone.css";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
  Search,
  Home,
  Music,
  User,
  Repeat,
  Shuffle,
  Plus,
  Clock,
  MoreHorizontal,
} from "lucide-react";
const SpotifyClone = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off"); // 'off', 'one', 'all'
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedSongs, setLikedSongs] = useState(new Set());
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  const audioRef = useRef(null);

  const songs = [
    {
      id: 1,
      title: "Sirf Tum Panchhi Sur Mein Gate Hai",
      artist: "Lata Mangeshkar",
      album: "Romantic Melodies",
      genre: "romantic",
      duration: "4:32",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751780823/05_SIRF_TUM_PANCHHI_SUR_MEIN_GATE_HAI_elfnim.mp3",
      cover:
        "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Dil Kya Kare",
      artist: "Alka Yagnik",
      album: "Bollywood Hits",
      genre: "bollywood",
      duration: "5:15",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751780812/06_DIL_KYA_KARE_TITLE_SONG_xrh9kv.mp3",
      cover:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Kahe Ko Bulaya",
      artist: "Mohammed Rafi",
      album: "Classical Collection",
      genre: "classical",
      duration: "6:20",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751780714/006._Kahe_Ko_Bulaya_rn8grb.mp3",
      cover:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Ey Mere Humsafar",
      artist: "Udit Narayan",
      album: "Qayamat Se Qayamat Tak",
      genre: "romantic",
      duration: "4:45",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751780666/04_QAYAMAT_SE_QAYAMAT_TAK_EY_MERE_HUMSAFAR_puzhi6.mp3",
      cover:
        "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=300&h=300&fit=crop",
    },
    {
      id: 5,
      title: "Subah Se Lekar",
      artist: "Kavita Krishnamurthy",
      album: "Mohra",
      genre: "bollywood",
      duration: "5:30",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751780638/03_MOHRA_SUBAH_SE_LEKAR_gflr5x.mp3",
      cover:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
    },
    {
      id: 6,
      title: "Ni Sultana Re Pyar Ka Mausam",
      artist: "Kishore Kumar",
      album: "Retro Hits",
      genre: "retro",
      duration: "4:18",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751780539/005_Ni_sultana_re_pyar_ka_mausam_eoho2i.mp3",
      cover:
        "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
    },
    {
      id: 7,
      title: "Rut Hai Milan Ki",
      artist: "Lata Mangeshkar",
      album: "Romantic Collection",
      genre: "romantic",
      duration: "4:55",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751780399/002_RUT_HAI_MILAN_KI_wtf09o.mp3",
      cover:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    },
    {
      id: 8,
      title: "Wada Karle Sajna Tere",
      artist: "Alka Yagnik",
      album: "Love Songs",
      genre: "romantic",
      duration: "5:12",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751780346/001_WADA_KARLE_SAJNA_TERE_b781h9.mp3",
      cover:
        "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=300&h=300&fit=crop",
    },
    {
      id: 9,
      title: "Dil Se E Ajnabi",
      artist: "A.R. Rahman",
      album: "Dil Se",
      genre: "bollywood",
      duration: "4:40",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751780336/11_DIL_SE_E_AJNABI_kzkmxo.mp3",
      cover:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    },
    {
      id: 10,
      title: "Mere Naseeb Mein",
      artist: "Kishore Kumar",
      album: "Classic Hits",
      genre: "retro",
      duration: "6:05",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751780313/011_mere_naseeb_mein_ypcdj8.mp3",
      cover:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=300&fit=crop",
    },
    {
      id: 11,
      title: "Ae Hawa Mere Sang",
      artist: "Sonu Nigam",
      album: "Modern Classics",
      genre: "bollywood",
      duration: "4:25",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751780303/001_ae_hawa_mere_sang_aswv17.mp3",
      cover:
        "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop",
    },
    {
      id: 12,
      title: "Laagi Chhoote Na",
      artist: "Shreya Ghoshal",
      album: "Emotional Melodies",
      genre: "romantic",
      duration: "5:35",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751780268/012_Laagi_Chhoote_Na_bfp5cy.mp3",
      cover:
        "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=300&h=300&fit=crop",
    },
    {
      id: 13,
      title: "Maan Chaha Hai Tujhko",
      artist: "Udit Narayan",
      album: "Romantic Hits",
      genre: "romantic",
      duration: "4:50",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751780233/10_MAAN_CHAHA_HAI_TUJHKO_rpztby.mp3",
      cover:
        "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=300&h=300&fit=crop",
    },
    {
      id: 14,
      title: "Hare Hare Hare",
      artist: "Abhijeet",
      album: "Josh",
      genre: "bollywood",
      duration: "4:15",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751780158/09_JOSH_HARE_HARE_HARE_yq2mvn.mp3",
      cover:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
    },
    {
      id: 15,
      title: "Kya Dekhte Ho",
      artist: "Kumar Sanu",
      album: "Popular Songs",
      genre: "bollywood",
      duration: "5:08",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751780223/011_Kya_dekhte_ho_pk82as.mp3",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    },
    {
      id: 16,
      title: "O Mere Dil Ke Chain",
      artist: "Kishore Kumar",
      album: "Timeless Classics",
      genre: "retro",
      duration: "4:33",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751779874/008_O_Mere_Dil_Ke_Chain_lwun40.mp3",
      cover:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    },
    {
      id: 17,
      title: "Mere Mitwa Mere Meet Re",
      artist: "Lata Mangeshkar",
      album: "Geet",
      genre: "classical",
      duration: "5:45",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751779880/007_Mere_mitwa_mere_meet_re_-_Geet_yqypqu.mp3",
      cover:
        "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
    },
    {
      id: 18,
      title: "Yeh Mulaqat Ek Bahana",
      artist: "Sonu Nigam",
      album: "Love Collection",
      genre: "romantic",
      duration: "4:22",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751779964/007_yeh_mulaqat_ek_bahana_oual41.mp3",
      cover:
        "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=300&h=300&fit=crop",
    },
    {
      id: 19,
      title: "Raat Ki Hatheli Par",
      artist: "Sonu Nigam",
      album: "Refugee",
      genre: "bollywood",
      duration: "5:20",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751780084/07_REFUGEE_RAAT_KI_HATHELI_PAR_qdmgf8.mp3",
      cover:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
    },
    {
      id: 20,
      title: "Dheere Dheere Aap Mere",
      artist: "Udit Narayan",
      album: "Baazi",
      genre: "romantic",
      duration: "4:58",
      url: "https://res.cloudinary.com/dy7jrabpa/video/upload/v1751780056/08_BAAZI_DHEERE_DHEERE_AAP_MERE_rmydua.mp3",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    },
  ];

  const genres = ["all", "romantic", "bollywood", "classical", "retro"];

  const filteredSongs = songs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "all" || song.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  // Effect to handle audio play/pause when isPlaying changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    let newIndex;
    if (isShuffling) {
      newIndex = Math.floor(Math.random() * songs.length);
    } else {
      newIndex = (currentSong + 1) % songs.length;
    }

    setCurrentSong(newIndex);

    // Add to recently played
    const song = songs[newIndex];
    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((s) => s.id !== song.id);
      return [song, ...filtered].slice(0, 10);
    });
  };

  const prevSong = () => {
    let newIndex;
    if (isShuffling) {
      newIndex = Math.floor(Math.random() * songs.length);
    } else {
      newIndex = (currentSong - 1 + songs.length) % songs.length;
    }

    setCurrentSong(newIndex);

    // Add to recently played
    const song = songs[newIndex];
    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((s) => s.id !== song.id);
      return [song, ...filtered].slice(0, 10);
    });
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleLike = (songId) => {
    const newLiked = new Set(likedSongs);
    if (newLiked.has(songId)) {
      newLiked.delete(songId);
    } else {
      newLiked.add(songId);
    }
    setLikedSongs(newLiked);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const playSong = (songId) => {
    // Find the song index in the original songs array by ID
    const songIndex = songs.findIndex((song) => song.id === songId);
    if (songIndex !== -1) {
      setCurrentSong(songIndex);
      setIsPlaying(true);

      // Add to recently played (avoid duplicates and limit to 10 songs)
      const song = songs[songIndex];
      setRecentlyPlayed((prev) => {
        const filtered = prev.filter((s) => s.id !== song.id);
        return [song, ...filtered].slice(0, 10);
      });
    }
  };

  return (
    <div className="spotify-clone">
      <div className="sidebar">
        <div className="logo">
          <Music className="logo-icon" />
          <span>Spotify 2.0</span>
        </div>

        <nav className="nav-menu">
          <div
            className={`nav-item ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            <Home size={20} />
            <span>Home</span>
          </div>
          <div
            className={`nav-item ${activeTab === "search" ? "active" : ""}`}
            onClick={() => setActiveTab("search")}
          >
            <Search size={20} />
            <span>Search</span>
          </div>
          <div
            className={`nav-item ${activeTab === "library" ? "active" : ""}`}
            onClick={() => setActiveTab("library")}
          >
            <Music size={20} />
            <span>Your Library</span>
          </div>
        </nav>

        <div className="playlist-section">
          <div className="playlist-header">
            <span>Made for You</span>
            <Plus size={16} />
          </div>
          <div
            className={`playlist-item ${activeTab === "liked" ? "active" : ""}`}
            onClick={() => setActiveTab("liked")}
          >
            <Heart size={16} />
            <span>Liked Songs</span>
          </div>
          <div
            className={`playlist-item ${
              activeTab === "recent" ? "active" : ""
            }`}
            onClick={() => setActiveTab("recent")}
          >
            <Clock size={16} />
            <span>Recently Played</span>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="top-bar">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search for songs, artists, or albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="user-profile">
            <User className="user-icon" />
            <span>Profile</span>
          </div>
        </div>

        <div className="genre-filters">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`genre-btn ${selectedGenre === genre ? "active" : ""}`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </button>
          ))}
        </div>

        <div className="content-section">
          {activeTab === "home" && (
            <>
              <h2>Your Music</h2>
              <div className="songs-grid">
                {filteredSongs.map((song, index) => (
                  <div
                    key={song.id}
                    className="song-card"
                    onClick={() => playSong(song.id)}
                  >
                    <div className="song-cover">
                      <img src={song.cover} alt={song.title} />
                      <div className="play-overlay">
                        <Play className="play-icon" />
                      </div>
                    </div>
                    <div className="song-info">
                      <h4>{song.title}</h4>
                      <p>{song.artist}</p>
                      <span className="genre-tag">{song.genre}</span>
                    </div>
                    <div className="song-actions">
                      <button
                        className={`like-btn ${
                          likedSongs.has(song.id) ? "liked" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(song.id);
                        }}
                      >
                        <Heart size={16} />
                      </button>
                      <MoreHorizontal size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "liked" && (
            <>
              <h2>Liked Songs</h2>
              {Array.from(likedSongs).length === 0 ? (
                <div className="empty-state">
                  <Heart size={64} className="empty-icon" />
                  <h3>No liked songs yet</h3>
                  <p>Songs you like will appear here</p>
                </div>
              ) : (
                <div className="songs-grid">
                  {songs
                    .filter((song) => likedSongs.has(song.id))
                    .map((song) => (
                      <div
                        key={song.id}
                        className="song-card"
                        onClick={() => playSong(song.id)}
                      >
                        <div className="song-cover">
                          <img src={song.cover} alt={song.title} />
                          <div className="play-overlay">
                            <Play className="play-icon" />
                          </div>
                        </div>
                        <div className="song-info">
                          <h4>{song.title}</h4>
                          <p>{song.artist}</p>
                          <span className="genre-tag">{song.genre}</span>
                        </div>
                        <div className="song-actions">
                          <button
                            className="like-btn liked"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(song.id);
                            }}
                          >
                            <Heart size={16} />
                          </button>
                          <MoreHorizontal size={16} />
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </>
          )}

          {activeTab === "recent" && (
            <>
              <h2>Recently Played</h2>
              {recentlyPlayed.length === 0 ? (
                <div className="empty-state">
                  <Clock size={64} className="empty-icon" />
                  <h3>No recently played songs</h3>
                  <p>Songs you play will appear here</p>
                </div>
              ) : (
                <div className="songs-grid">
                  {recentlyPlayed.map((song) => (
                    <div
                      key={`recent-${song.id}`}
                      className="song-card"
                      onClick={() => playSong(song.id)}
                    >
                      <div className="song-cover">
                        <img src={song.cover} alt={song.title} />
                        <div className="play-overlay">
                          <Play className="play-icon" />
                        </div>
                      </div>
                      <div className="song-info">
                        <h4>{song.title}</h4>
                        <p>{song.artist}</p>
                        <span className="genre-tag">{song.genre}</span>
                      </div>
                      <div className="song-actions">
                        <button
                          className={`like-btn ${
                            likedSongs.has(song.id) ? "liked" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(song.id);
                          }}
                        >
                          <Heart size={16} />
                        </button>
                        <MoreHorizontal size={16} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "search" && (
            <>
              <h2>Search</h2>
              <div className="songs-grid">
                {filteredSongs.map((song, index) => (
                  <div
                    key={song.id}
                    className="song-card"
                    onClick={() => playSong(song.id)}
                  >
                    <div className="song-cover">
                      <img src={song.cover} alt={song.title} />
                      <div className="play-overlay">
                        <Play className="play-icon" />
                      </div>
                    </div>
                    <div className="song-info">
                      <h4>{song.title}</h4>
                      <p>{song.artist}</p>
                      <span className="genre-tag">{song.genre}</span>
                    </div>
                    <div className="song-actions">
                      <button
                        className={`like-btn ${
                          likedSongs.has(song.id) ? "liked" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(song.id);
                        }}
                      >
                        <Heart size={16} />
                      </button>
                      <MoreHorizontal size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "library" && (
            <>
              <h2>Your Library</h2>
              <div className="library-stats">
                <div className="stat-card">
                  <Heart size={32} className="stat-icon" />
                  <div>
                    <h3>{likedSongs.size}</h3>
                    <p>Liked Songs</p>
                  </div>
                </div>
                <div className="stat-card">
                  <Clock size={32} className="stat-icon" />
                  <div>
                    <h3>{recentlyPlayed.length}</h3>
                    <p>Recently Played</p>
                  </div>
                </div>
              </div>
              <div className="songs-grid">
                {songs.map((song, index) => (
                  <div
                    key={song.id}
                    className="song-card"
                    onClick={() => playSong(song.id)}
                  >
                    <div className="song-cover">
                      <img src={song.cover} alt={song.title} />
                      <div className="play-overlay">
                        <Play className="play-icon" />
                      </div>
                    </div>
                    <div className="song-info">
                      <h4>{song.title}</h4>
                      <p>{song.artist}</p>
                      <span className="genre-tag">{song.genre}</span>
                    </div>
                    <div className="song-actions">
                      <button
                        className={`like-btn ${
                          likedSongs.has(song.id) ? "liked" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(song.id);
                        }}
                      >
                        <Heart size={16} />
                      </button>
                      <MoreHorizontal size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="player-bar">
        <div className="now-playing">
          <img
            src={songs[currentSong].cover}
            alt={songs[currentSong].title}
            className="now-playing-cover"
          />
          <div className="now-playing-info">
            <h4>{songs[currentSong].title}</h4>
            <p>{songs[currentSong].artist}</p>
          </div>
          <button
            className={`like-btn ${
              likedSongs.has(songs[currentSong].id) ? "liked" : ""
            }`}
            onClick={() => toggleLike(songs[currentSong].id)}
          >
            <Heart size={16} />
          </button>
        </div>

        <div className="player-controls">
          <div className="control-buttons">
            <button
              className={`control-btn ${isShuffling ? "active" : ""}`}
              onClick={() => setIsShuffling(!isShuffling)}
            >
              <Shuffle size={16} />
            </button>
            <button className="control-btn" onClick={prevSong}>
              <SkipBack size={20} />
            </button>
            <button className="play-btn" onClick={togglePlayPause}>
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button className="control-btn" onClick={nextSong}>
              <SkipForward size={20} />
            </button>
            <button
              className={`control-btn ${repeatMode !== "off" ? "active" : ""}`}
              onClick={() => {
                const modes = ["off", "all", "one"];
                const currentIndex = modes.indexOf(repeatMode);
                setRepeatMode(modes[(currentIndex + 1) % modes.length]);
              }}
            >
              <Repeat size={16} />
            </button>
          </div>

          <div className="progress-container">
            <span className="time-display">{formatTime(currentTime)}</span>
            <div className="progress-bar" onClick={handleSeek}>
              <div
                className="progress-fill"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              />
            </div>
            <span className="time-display">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="volume-controls">
          <button className="volume-btn" onClick={toggleMute}>
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={songs[currentSong].url}
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={() => {
          const audio = audioRef.current;
          if (audio) {
            setCurrentTime(audio.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          const audio = audioRef.current;
          if (audio) {
            setDuration(audio.duration);
          }
        }}
        onEnded={() => {
          if (repeatMode === "one") {
            const audio = audioRef.current;
            audio.currentTime = 0;
            audio.play();
          } else if (repeatMode === "all") {
            nextSong();
          } else {
            setIsPlaying(false);
          }
        }}
        onError={(e) => {
          console.error("Audio error:", e);
          setIsPlaying(false);
          setIsLoading(false);
        }}
      />
    </div>
  );
};

export default SpotifyClone;
