const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const os = require('os');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('botstats')
		.setDescription('displays information about the bot'),
    
    async execute(interaction, client) {
        function mil_to_HM (timeInt) {
            let time = round((timeInt/3600000)*100).toString();
            if (time.lenght > 3) {
                return (`${time[0] + time[1]} Hours, ${time[2] + time[3]} Minutes`);
            }
            else {
                return (`0${time[0]} Hours, ${time[1] + time[2]} Minutes`);
            }
        }
        const embed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle(`Stats about: ${client.user.tag}`)
        .addFields(
            { name: 'Uptime', value: mil_to_HM(client.uptime), inline: false },
            { name: 'Servers present', value: client.guilds.size.toString(), inline: false },
            { name: 'Bot ping', valie: `${client.ws.ping} ms`, inline: false },
            { name: 'Memory usage', value: `${round(os.totalmem() - os.freemem()/10000)}/${round(os.totalmem()/10000)} mbs in use`, inline: false },
        )

        await interaction.reply({ embeds: [embed]});
    }

};