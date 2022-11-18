import { responseHandler } from '../middlewares/responseHandler.middlewares'
import Vote from '../models/votes.models'

export const getAllVotes = async (req, res, next) => {
  try {
    const votes = await Vote.find({}, {
      createdAt: 0,
      updatedAt: 0
    }).populate('user', {
      _id: 0,
      username: 1
    }).populate('match', {
      _id: 0,
      date: 1,
      hour: 1,
      stadium: 1
    }).populate('vote', {
      _id: 1,
      country: 1,
      img: 1
    })

    if (votes.length <= 0) {
      return responseHandler(res, 404, true, 'Votes no found', null)
    }

    return responseHandler(res, 200, false, 'All votes', votes)
  } catch (err) {
    next(err)
  }
}

export const getVotesByMatch = async (req, res, next) => {
  try {
    const { id } = req.params
    const votes = await Vote.find({ match: id }, {
      match: 0,
      createdAt: 0,
      updatedAt: 0
    }).populate('vote', {
      _id: 0,
      country: 1,
      img: 1
    }).populate('user', {
      _id: 0,
      username: 1
    })

    if (votes.length <= 0) {
      return responseHandler(res, 404, true, 'Votes no found for this match', null)
    }

    return responseHandler(res, 200, false, 'Votes found for this match', votes)
  } catch (err) {
    next(err)
  }
}

export const createVote = async (req, res, next) => {
  try {
    const { user } = req
    const { match, team } = req.body
    const searchVote = await Vote.findOne({ match, user: user.id })

    if (searchVote) {
      return responseHandler(res, 404, true, 'Vote already exists for this match', null)
    }

    const voteData = {
      user: user.id,
      match,
      vote: team
    }

    const newVote = await Vote(voteData)
    await newVote.save()

    return responseHandler(res, 200, false, 'Vote created successfully', newVote)
  } catch (err) {
    next(err)
  }
}
