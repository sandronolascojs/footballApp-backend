import { responseHandler } from '../middlewares/responseHandler.middlewares'
import Group from '../models/groups.models'

export const getAllGroups = async (req, res, next) => {
  try {
    const groups = await Group.find({}, {
      createdAt: 0,
      updatedAt: 0
    }).populate('teams', {
      _id: 1,
      country: 1,
      img: 1,
      status: 1,
      points: 1
    })

    if (groups.length <= 0) {
      return responseHandler(res, 404, true, 'Groups no found', null)
    }

    return responseHandler(res, 200, false, 'Groups found', groups)
  } catch (err) {
    next(err)
  }
}

export const getGroupById = async (req, res, next) => {
  try {
    const { id } = req.params

    const group = await Group.findById(id, {
      createdAt: 0,
      updatedAt: 0
    }).populate('teams', {
      _id: 1,
      country: 1,
      img: 1,
      status: 1,
      points: 1
    })

    if (group.length <= 0) {
      return responseHandler(res, 404, true, 'Group no found', null)
    }

    return responseHandler(res, 200, false, 'Group found', group)
  } catch (err) {
    next(err)
  }
}

export const createGroup = async (req, res, next) => {
  try {
    const { name } = req.body

    const searchGroup = await Group.findOne({ name })

    if (searchGroup) {
      return responseHandler(res, 404, true, 'Group already exists', null)
    }

    const groupData = {
      name
    }
    const newGroup = await Group(groupData)
    await newGroup.save()

    const data = {
      id: newGroup._id,
      name: newGroup.name
    }

    return responseHandler(res, 201, false, 'Group created', data)
  } catch (err) {
    next(err)
  }
}

export const deleteGroup = async (req, res, next) => {
  try {
    const { id } = req.params

    const group = await Group.findByIdAndDelete(id)

    if (!group) {
      return responseHandler(res, 404, true, 'Group no found', null)
    }

    return responseHandler(res, 200, false, 'Group deleted', group)
  } catch (err) {
    next(err)
  }
}
