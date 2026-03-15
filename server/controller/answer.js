import mongoose from "mongoose";
import question from "../models/question.js";
import user from "../models/auth.js";

export const Askanswer = async (req, res) => {
const { id: _id } = req.params;

if (!mongoose.Types.ObjectId.isValid(_id)) {
return res.status(400).json({ message: "question unavailable" });
}

const { noofanswer, answerbody, useranswered, userid } = req.body;

try {

```
const updatequestion = await question.findByIdAndUpdate(
  _id,
  {
    $push: {
      answer: {
        answerbody,
        useranswered,
        userid
      }
    }
  },
  { new: true }
);

// ⭐ give 5 points when answering
await user.findByIdAndUpdate(userid, {
  $inc: { points: 5 }
});

await question.findByIdAndUpdate(_id, {
  $set: { noofanswer: noofanswer }
});

res.status(200).json({ data: updatequestion });
```

} catch (error) {
console.log(error);
res.status(500).json("something went wrong");
}
};

export const deleteanswer = async (req, res) => {
const { id: _id } = req.params;
const { noofanswer, answerid } = req.body;

if (!mongoose.Types.ObjectId.isValid(_id)) {
return res.status(400).json({ message: "question unavailable" });
}

try {

```
const questiondata = await question.findById(_id);

const answer = questiondata.answer.find(
  (ans) => ans._id.toString() === answerid
);

// ⭐ deduct points when answer deleted
await user.findByIdAndUpdate(answer.userid, {
  $inc: { points: -5 }
});

await question.updateOne(
  { _id },
  {
    $pull: { answer: { _id: answerid } }
  }
);

await question.findByIdAndUpdate(_id, {
  $set: { noofanswer: noofanswer }
});

res.status(200).json({ message: "Answer deleted successfully" });
```

} catch (error) {
console.log(error);
res.status(500).json("something went wrong");
}
};
