const path = require("path");

const express = require("express");

const Player = require("../models/player");

const Sequelize = require("sequelize");

exports.getMainPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
};

exports.addPlayer = async (req, res, next) => {
  const {
    name,
    dob,
    photo,
    birthplace,
    career,
    matches,
    score,
    fifties,
    centuries,
    wickets,
    average,
  } = req.body;

  try {
    if (
      !name ||
      !dob ||
      !photo ||
      !birthplace ||
      !career ||
      !matches ||
      !score ||
      !fifties ||
      !centuries ||
      !wickets ||
      !average
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    await Player.create({
      name: name,
      dob: dob,
      photo: photo,
      birthplace: birthplace,
      career: career,
      matches: matches,
      score: score,
      fifties: fifties,
      centuries: centuries,
      wickets: wickets,
      average: average,
    });
    res.status(201).json({ message: "Player Info Added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getPlayers = async (req, res, next) => {
  try {
    const players = await Player.findAll();
    res.status(200).json(players);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.playerSearch = async (req, res, next) => {
  const searchPlayer = req.body.searchPlayer;
  console.log(searchPlayer);
  try {
    const player = await Player.findAll({
      where: {
        name: { [Sequelize.Op.like]: `%${searchPlayer}` },
      },
    });
    res.status(200).json(player[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
