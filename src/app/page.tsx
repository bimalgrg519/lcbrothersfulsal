"use client";
import { useState } from "react";

function shuffleTeams(pairs: any) {
  const teamA: any = [];
  const teamB: any = [];

  pairs.forEach((pair: any) => {
    // Randomly assign the first member of the pair to either teamA or teamB
    if (Math.random() > 0.5) {
      teamA.push(pair[0]);
      teamB.push(pair[1]);
    } else {
      teamA.push(pair[1]);
      teamB.push(pair[0]);
    }
  });

  return { teamA, teamB };
}

export default function Home() {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<any[]>([
    {
      id: 1,
      name: "Bimal",
    },
    {
      id: 2,
      name: "Amir",
    },
    {
      id: 3,
      name: "Shankar",
    },
    {
      id: 4,
      name: "Sirdar",
    },
    {
      id: 5,
      name: "Bikal",
    },
    {
      id: 6,
      name: "Prakash",
    },
    {
      id: 7,
      name: "Sanish",
    },
    {
      id: 8,
      name: "Kushal",
    },
    {
      id: 9,
      name: "Nirajan",
    },
    {
      id: 10,
      name: "Gange",
    },
    {
      id: 11,
      name: "Aagaman",
    },
    {
      id: 12,
      name: "Jiwon",
    },
    {
      id: 13,
      name: "Rajin",
    },
    {
      id: 14,
      name: "Sanjaya",
    },
    {
      id: 15,
      name: "Sunil",
    },
  ]);

  const [teamPair, setTeamPair] = useState<any[]>([]);

  const [selectedPlayer1, setSelectedPlayer1] = useState<any>("");
  const [selectedPlayer2, setSelectedPlayer2] = useState<any>("");

  const [teamA, setTeamA] = useState<any[]>([]);
  const [teamB, setTeamB] = useState<any[]>([]);

  const handleSubmit = () => {
    if (selectedPlayer1 && selectedPlayer2) {
      const filteredPlayers = players.filter(
        (p) => p.id !== selectedPlayer1.id && p.id !== selectedPlayer2.id
      );
      setPlayers(filteredPlayers);
      setTeamPair([...teamPair, [selectedPlayer1, selectedPlayer2]]);
      setSelectedPlayer1("");
      setSelectedPlayer2("");
    }
  };

  const handleSuffle = () => {
    const { teamA, teamB } = shuffleTeams(teamPair);
    setTeamA(teamA);
    setTeamB(teamB);
  };

  const handleAdd = () => {
    if (playerName) {
      const newPlayer = {
        id: players.length + 1,
        name: playerName,
      };
      setPlayers([...players, newPlayer]);
      setPlayerName("");
    }
  };

  const handleRemove = (removedPlayers) => {
    const [player1, player2] = removedPlayers;

    setTeamPair(
      teamPair.filter((p) => p[0].id !== player1.id && p[1].id !== player2.id)
    );
    setPlayers([...players, ...removedPlayers]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full max-w-5xl font-mono">
        <h1 className="text-xl">LC Brotherhood</h1>
        <div className="flex space-x-2">
          <input
            className="text-black px-2"
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value);
            }}
          />
          <button className="bg-blue-300 px-4 text-black" onClick={handleAdd}>
            Add
          </button>
        </div>
        <div className="flex gap-x-3 gap-y-3 mt-3 flex-wrap">
          {players.map((player) => (
            <div key={player.id} className="border px-2">
              <h1>{player.name}</h1>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <div className="w-full flex p-2 space-x-2">
            <select
              className="text-black w-full"
              value={selectedPlayer1 ? selectedPlayer1.id : ""}
              onChange={(e) => {
                setSelectedPlayer1(
                  players.find((player) => player.id === Number(e.target.value))
                );
              }}
            >
              <option value="" disabled>
                Player 1
              </option>
              {players.map((player) => (
                <option key={player.id} value={player.id} className="text-xl">
                  {player.name}
                </option>
              ))}
            </select>
            <select
              className="text-black w-full"
              value={selectedPlayer2 ? selectedPlayer2.id : ""}
              onChange={(e) => {
                setSelectedPlayer2(
                  players.find((player) => player.id === Number(e.target.value))
                );
              }}
            >
              <option value="" disabled>
                Player 2
              </option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </select>
            <button
              className="bg-blue-300 px-4 text-black"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <div className="flex space-x-2">
            <div className="flex-1">
              <div className="flex">
                <h2 className="flex-1">Team 1</h2>
                <h2 className="flex-1">Team 2</h2>
              </div>
              {
                <div className="space-y-2">
                  {teamPair.map((players: any, index) => (
                    <div key={index} className="flex space-x-2">
                      <div className="flex-1 border px-2">
                        <h1>{players[0].name}</h1>
                      </div>
                      <div className="flex-1 border px-2">
                        <h1>{players[1].name}</h1>
                      </div>
                      <button
                        className="bg-red-600 px-4 rounded"
                        onClick={() => handleRemove(players)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>
          <button
            onClick={handleSuffle}
            className="bg-blue-200 text-black p-2 rounded my-4"
          >
            Suffle
          </button>
          <div className="flex">
            <div className="flex-1">
              <h2>Team 1</h2>
              {
                <div className="flex flex-col space-y-2">
                  {teamA.map((player: any) => (
                    <div key={player.id} className="border px-2">
                      <h1>{player.name}</h1>
                    </div>
                  ))}
                </div>
              }
            </div>
            <div className="flex-1">
              <h2>Team 2</h2>
              {
                <div className="flex flex-col space-y-2">
                  {teamB.map((player: any) => (
                    <div key={player.id} className="border px-2">
                      <h1>{player.name}</h1>
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
