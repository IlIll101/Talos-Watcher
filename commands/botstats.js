const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const os = require('os');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('botstats')
		.setDescription('displays information about the bot'),
    
    async execute(interaction, client) {
        function mil_to_HM (t) {
            var cd = 24 * 60 * 60 * 1000,
            ch = 60 * 60 * 1000,
            d = Math.floor(t / cd),
            h = Math.floor( (t - d * cd) / ch),
            m = Math.round( (t - d * cd - h * ch) / 60000),
            pad = function(n){ return n < 10 ? '0' + n : n; };
            if( m === 60 ){
                h++;
                m = 0;
            }
            if( h === 24 ){
                d++;
                h = 0;
            }
            return [d, pad(h), pad(m)].join(':');
        }

        const embed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle(`Stats about: ${client.user.tag}`)
        .addFields(
            { name: 'Uptime', value: mil_to_HM(client.uptime).toString(), inline: false },
            { name: 'Servers present', value: client.guilds.cache.size.toString(), inline: false },
            { name: 'Bot ping', valie: `${client.ws.ping} ms`, inline: false },
            { name: 'Memory usage', value: `${Math.round(os.totalmem() - os.freemem()/10000)}/${Math.round(os.totalmem()/10000)} mbs in use`, inline: false },
        )

        await interaction.reply({ embeds: [embed]});
    }

};
