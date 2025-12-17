import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageWrapper from './components/layout/PageWrapper';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import RoomLobby from './pages/RoomLobby';
import DebateRoom from './pages/DebateRoom';
import ResultScreen from './pages/ResultScreen';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <PageWrapper>
              <Profile />
            </PageWrapper>
          }
        />
        <Route
          path="/create-room"
          element={
            <PageWrapper>
              <CreateRoom />
            </PageWrapper>
          }
        />
        <Route
          path="/join-room"
          element={
            <PageWrapper>
              <JoinRoom />
            </PageWrapper>
          }
        />
        <Route
          path="/room-lobby"
          element={
            <PageWrapper>
              <RoomLobby />
            </PageWrapper>
          }
        />
        <Route
          path="/debate"
          element={
            <PageWrapper>
              <DebateRoom />
            </PageWrapper>
          }
        />
        <Route
          path="/results"
          element={
            <PageWrapper>
              <ResultScreen />
            </PageWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
