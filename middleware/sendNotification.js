import Notification from "../models/notification.js"
import User from "../models/user.js"
import { connectedUsers, io } from "../index.js"

// export async function sendNotification(req, res, notification) {
export async function sendNotification(req, res) {
  const notificationForm = req.notificationForm
  notificationForm.unread = true
  var receiverIds = notificationForm.receiverId
    ? [notificationForm.receiverId]
    : []

  if (notificationForm.notifyAdmins === true) {
    await getAdminIdsAndPush()
  }

  let createdNotification = await new Notification(notificationForm).save()

  // Update unread notification
  receiverIds.map(async (id) => {
    let object = {
      notificationId: createdNotification._id,
      unread: false,
    }

    await User.updateOne(
      { _id: id },
      {
        $addToSet: {
          notifications: object,
        },
      }
    )
    // await User.updateOne({ _id: id }, { $inc: { unreadNotifications: 1 } })
  })

  // Send Socket notification
  Object.entries(connectedUsers).forEach(([socketId, userData]) => {
    if (receiverIds.includes(userData.userId)) {
      io.to(socketId).emit("new-notification", {
        unread: true,
        notificationId: createdNotification,
      })
      console.log(
        "Notification sent to " + userData.name + " role : " + userData.role
      )
    }
  })

  // Send socket to Redux
  io.emit("redux-update", notificationForm.reduxUpdate)

  async function getAdminIdsAndPush() {
    let admins = await User.find({ role: "admin" }, "_id")

    admins.map((admin) => {
      receiverIds.push(admin._id.toString())
    })
  }
}
