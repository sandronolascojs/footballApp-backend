import Teams from '../models/teams.models'
import { responseHandler } from '../middlewares/responseHandler.middlewares'
import Group from '../models/groups.models'

export const getAllTeams = async (req, res, next) => {
  try {
    const teams = await Teams.findAll()

    if (teams.length <= 0) {
      return responseHandler(res, 404, true, 'Teams no found', null)
    }

    return responseHandler(res, 200, false, 'Teams found', teams)
  } catch (err) {
    next(err)
  }
}

export const getTeamById = async (req, res, next) => {
  try {
    const { id } = req.params
    const team = await Teams.findByPk(id)

    if (team.length <= 0) {
      return responseHandler(res, 404, true, 'Teams no found', null)
    }

    return responseHandler(res, 200, false, 'Team found', team)
  } catch (err) {
    next(err)
  }
}

export const createTeam = async (req, res, next) => {
  try {
    const { country, img, groupId } = req.body

    const searchTeam = await Teams.findOne({ country })

    if (searchTeam) {
      return responseHandler(res, 404, true, 'Teams already exists', null)
    }

    const teamData = {
      country,
      img,
      groupId
    }

    const newTeam = await Teams(teamData)

    await newTeam.save()

    const group = await Group.findById(groupId)

    group.teams = group.teams.concat(newTeam._id)
    await group.save()

    return responseHandler(res, 201, false, 'Team created', newTeam)
  } catch (err) {
    next(err)
  }
}

export const deleteTeam = async (req, res, next) => {
  try {
    const { id } = req.params

    const team = await Teams.findById(id)

    if (team <= 0) {
      return responseHandler(res, 404, true, 'Team no found', null)
    }

    await Teams.findByIdAndDelete(id)
    return responseHandler(res, 200, false, 'Team removed', null)
  } catch (err) {
    next(err)
  }
}

export const updateTeam = async (req, res, next) => {
  try {
    const { id } = req.params
    const { country, groupId, img } = req.body

    const team = await Teams.findByPk(id)

    if (team <= 0) {
      return responseHandler(res, 404, true, 'Team no found', null)
    }

    const newTeamData = {
      ...team,
      country,
      groupId,
      img
    }

    await Teams.update(newTeamData, { where: { id } })

    return responseHandler(res, 200, false, 'Team updated', null)
  } catch (err) {
    next(err)
  }
}
