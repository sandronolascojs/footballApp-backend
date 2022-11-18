import { responseHandler } from '../middlewares/responseHandler.middlewares'
import Match from '../models/matchs.models'

export const getAllMatchs = async (req, res, next) => {
  try {
    const matchs = await Match.find({}, {
      createdAt: 0,
      updatedAt: 0
    }).populate('teams', {
      _id: 1,
      country: 1,
      img: 1,
      points: 1,
      status: 1
    })

    if (matchs.length <= 0) {
      return responseHandler(res, 404, true, 'Matchs no found', null)
    }

    return responseHandler(res, 200, false, 'All matchs', matchs)
  } catch (err) {
    next(err)
  }
}

export const getMatchById = async (req, res, next) => {
  try {
    const { id } = req.params
    const match = await Match.findById(id, {
      updatedAt: 0,
      createdAt: 0
    }).populate('teams', {
      _id: 1,
      country: 1,
      img: 1
    })

    if (match.length <= 0) {
      return responseHandler(res, 404, true, 'Match no found', null)
    }

    return responseHandler(res, 200, false, 'Match found', match)
  } catch (err) {
    next(err)
  }
}

export const createMatch = async (req, res, next) => {
  try {
    const { teamOne, teamTwo, date, hour, rawDate, stadium, winner, status } = req.body

    const convertDate = new Date(rawDate).toISOString()

    const matchData = {
      teams: [
        teamOne,
        teamTwo
      ],
      date,
      hour,
      rawDate: convertDate,
      stadium,
      winner,
      status
    }

    const newMatch = await Match(matchData)

    await newMatch.save()
    return responseHandler(res, 201, false, 'Match created', newMatch)
  } catch (err) {
    next(err)
  }
}
