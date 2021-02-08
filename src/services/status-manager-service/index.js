import moment from 'moment'
import { status } from '../../constants/status'
import { StatusChange } from '../../models/status-change.model'
import { Status } from '../../models/status.model'
class StatusManager {
  async changerStatus(newStatus, ctx, sess) {
    const statusChange = new StatusChange()
    statusChange.collectionName = this.collection.name
    statusChange.documentId = this._id
    statusChange.date = moment()
    statusChange.oldStatus = this.status
    this.status.main = newStatus
    statusChange.newStatus = this.status
    statusChange.userId = ctx.user.id

    await this.save({ session: sess })
    await statusChange.save({ session: sess })
  }

  statusChecker(status) {
    if (this.status?.main?.toString() === status) {
      return true
    } else {
      return false
    }
  }

  async statusWithName() {
    const status = await Status.findById(this.status.main).lean()
    return {
      id: status?._id || null,
      name: status?.name || null,
      isMain: status?.isMain || null
    }
  }

  // STATUS CHANGERS ///////////////////////////////////////

  async toActive(ctx, sess) {
    await this.changerStatus(status.active, ctx, sess)
  }

  async toInactive(ctx, sess) {
    await this.changerStatus(status.inactive, ctx, sess)
  }

  async toDeleted(ctx, sess) {
    await this.changerStatus(status.deleted, ctx, sess)
  }

  async toBlocked(ctx, sess) {
    await this.changerStatus(status.blocked, ctx, sess)
  }

  async toPending(ctx, sess) {
    await this.changerStatus(status.pending, ctx, sess)
  }

  async toDone(ctx, sess) {
    await this.changerStatus(status.done, ctx, sess)
  }

  async toCancelled(ctx, sess) {
    await this.changerStatus(status.cancelled, ctx, sess)
  }

  async toInProgress(ctx, sess) {
    await this.changerStatus(status.inProgress, ctx, sess)
  }

  async toFailedDelivery(ctx, sess) {
    await this.changerStatus(status.failedDelivery, ctx, sess)
  }

  async toDelivered(ctx, sess) {
    await this.changerStatus(status.delivered, ctx, sess)
  }

  async toChosen(ctx, sess) {
    await this.changerStatus(status.chosen, ctx, sess)
  }

  async toPayed(ctx, sess) {
    await this.changerStatus(status.payed, ctx, sess)
  }

  async toRejected(ctx, sess) {
    await this.changerStatus(status.rejected, ctx, sess)
  }

  async toFailed(ctx, sess) {
    await this.changerStatus(status.failed, ctx, sess)
  }

  // STATUS CHECKERS ///////////////////////////////////////

  isActive() {
    return this.statusChecker(status.active)
  }

  isInactive() {
    return this.statusChecker(status.inactive)
  }

  isDeleted() {
    return this.statusChecker(status.deleted)
  }

  isBlocked() {
    return this.statusChecker(status.blocked)
  }

  isPending() {
    return this.statusChecker(status.pending)
  }

  isDone() {
    return this.statusChecker(status.done)
  }

  isCancelled() {
    return this.statusChecker(status.cancelled)
  }

  isInProgress() {
    return this.statusChecker(status.inProgress)
  }

  isFailedDelivery() {
    return this.statusChecker(status.failedDelivery)
  }

  isDelivered() {
    return this.statusChecker(status.delivered)
  }

  isChosen() {
    return this.statusChecker(status.chosen)
  }

  isPayed() {
    return this.statusChecker(status.payed)
  }

  isRejected() {
    return this.statusChecker(status.rejected)
  }

  isFailed() {
    return this.statusChecker(status.failed)
  }
}

const statusSecInsert = async (Class, id, statusId) => {
  const obj = await Class.findById(id)
  const statusChange = new StatusChange()

  statusChange.collectionName = Class.collection.name
  statusChange.documentId = id
  statusChange.date = moment()
  statusChange.oldStatus = obj.status
  obj.status.sec.push(statusId)
  statusChange.newStatus = obj.status

  await Class.findByIdAndUpdate({ _id: obj.id }, obj, {
    new: true
  })
  await statusChange.save()
}

const statusSecUpdate = async (Class, id, statusIdArray) => {
  const obj = await Class.findById(id)
  const statusChange = new StatusChange()

  statusChange.collectionName = Class.collection.name
  statusChange.documentId = id
  statusChange.date = moment()
  statusChange.oldStatus = obj.status
  obj.status.sec = statusIdArray
  statusChange.newStatus = obj.status

  await Class.findByIdAndUpdate({ _id: obj.id }, obj, {
    new: true
  })
  await statusChange.save()
}

const statusAllChange = async (Class, id, statusObj) => {
  const obj = await Class.findById(id)
  const statusChange = new StatusChange()

  statusChange.collectionName = Class.collection.name
  statusChange.documentId = id
  statusChange.date = moment()
  statusChange.oldStatus = obj.status
  obj.status = statusObj
  statusChange.newStatus = obj.status

  await Class.findByIdAndUpdate({ _id: obj.id }, obj, {
    new: true
  })
  await statusChange.save()
}

export { StatusManager, statusSecInsert, statusSecUpdate, statusAllChange }
