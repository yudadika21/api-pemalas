const PemalasDB = require("../config/db");
const { getUserInfo } = require("../utils/values");

async function berapaView() {
	let v = await PemalasDB.findOne({ _id: "611258e3273c38054646fb5a" });
	return v;
}

exports.berapaView = berapaView;
exports.tambahView = async function () {
	let v = await berapaView();
	let vv = v.list.length + 1;
	let arr = v.list;
	let uInfo = await getUserInfo();
	let ip = uInfo.ip;
	if (arr.includes(ip)) return;
	arr.push(ip);
	PemalasDB.findOneAndUpdate(
		{ _id: "611258e3273c38054646fb5a" },
		{ $set: { list: arr } },
		(err, res) => {
			if (err) return err;
			console.log(res);
		}
	);
};
