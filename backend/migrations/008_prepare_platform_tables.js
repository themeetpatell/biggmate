exports.up = async function(knex) {
  // Extend users table with auth helpers
  await knex.schema.alterTable('users', (table) => {
    table.boolean('is_active').notNullable().defaultTo(true);
    table.string('role').notNullable().defaultTo('user');
  });

  // Authentication support tables
  await knex.schema.createTable('refresh_tokens', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.text('token').notNullable();
    table.timestamp('expires_at').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index(['user_id']);
    table.index(['expires_at']);
    table.unique(['token']);
  });

  await knex.schema.createTable('password_reset_tokens', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.text('token').notNullable();
    table.timestamp('expires_at').notNullable();
    table.boolean('used').notNullable().defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index(['user_id']);
    table.index(['expires_at']);
    table.unique(['token']);
  });

  // Startup catalog
  await knex.schema.createTable('startups', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('founder_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('name').notNullable();
    table.string('tagline').notNullable();
    table.text('description').notNullable();
    table.string('industry').notNullable();
    table.string('stage').notNullable();
    table.string('funding_amount');
    table.string('team_size').notNullable();
    table.string('location').notNullable();
    table.jsonb('images').defaultTo('[]');
    table.jsonb('social_links').defaultTo('{}');
    table.boolean('is_verified').defaultTo(false);
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index(['founder_id']);
    table.index(['industry']);
    table.index(['stage']);
    table.index(['location']);
    table.index(['is_active']);
  });

  await knex.schema.createTable('integrations', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('platform').notNullable();
    table.string('external_id');
    table.string('access_token');
    table.string('refresh_token');
    table.jsonb('profile_data').defaultTo('{}');
    table.timestamp('last_sync').defaultTo(knex.fn.now());
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index(['user_id']);
    table.index(['platform']);
    table.index(['is_active']);
    table.unique(['user_id', 'platform']);
  });

  // Founder operating model
  await knex.schema.createTable('founders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('company').notNullable();
    table.string('title').notNullable();
    table.string('location').notNullable();
    table.string('stage').notNullable();
    table.string('industry').notNullable();
    table.string('funding');
    table.integer('team_size');
    table.string('pitch_video_url');
    table.string('startupos_profile');
    table.integer('vision_match_score');
    table.string('builder_archetype');
    table.string('risk_profile');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index(['user_id']);
    table.index(['company']);
    table.index(['stage']);
    table.index(['industry']);
    table.index(['location']);
  });

  await knex.schema.createTable('founder_skills', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('founder_id').references('id').inTable('founders').onDelete('CASCADE');
    table.string('skill').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index(['founder_id']);
    table.index(['skill']);
  });

  await knex.schema.createTable('founder_interests', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('founder_id').references('id').inTable('founders').onDelete('CASCADE');
    table.string('interest').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index(['founder_id']);
    table.index(['interest']);
  });

  await knex.schema.createTable('founder_values', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('founder_id').references('id').inTable('founders').onDelete('CASCADE');
    table.string('value').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index(['founder_id']);
    table.index(['value']);
  });

  await knex.schema.createTable('founder_goals', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('founder_id').references('id').inTable('founders').onDelete('CASCADE');
    table.string('goal').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index(['founder_id']);
    table.index(['goal']);
  });

  await knex.schema.createTable('founder_preferences', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('founder_id').references('id').inTable('founders').onDelete('CASCADE').unique();
    table.jsonb('preferences').defaultTo('{}'); // discovery filters, location, industries, stages
    table.jsonb('match_settings').defaultTo('{}'); // weights, thresholds
    table.jsonb('notifications').defaultTo('{}');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index(['founder_id']);
  });

  await knex.schema.createTable('emotional_checkins', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('founder_id').references('id').inTable('founders').onDelete('CASCADE');
    table.enum('mood', ['excellent', 'good', 'neutral', 'challenging', 'difficult']).notNullable();
    table.integer('energy').notNullable();
    table.integer('stress').notNullable();
    table.integer('focus').notNullable();
    table.text('notes');
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index(['founder_id']);
    table.index(['mood']);
    table.index(['created_at']);
  });

  await knex.schema.createTable('builder_retreats', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.text('description');
    table.string('location').notNullable();
    table.date('start_date').notNullable();
    table.date('end_date').notNullable();
    table.integer('max_participants');
    table.decimal('price', 10, 2);
    table.string('status').defaultTo('upcoming');
    table.jsonb('activities').defaultTo('[]');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index(['start_date']);
    table.index(['location']);
    table.index(['status']);
  });

  await knex.schema.createTable('retreat_registrations', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('retreat_id').references('id').inTable('builder_retreats').onDelete('CASCADE');
    table.uuid('founder_id').references('id').inTable('founders').onDelete('CASCADE');
    table.timestamp('registration_date').defaultTo(knex.fn.now());
    table.string('status').defaultTo('confirmed');
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index(['retreat_id']);
    table.index(['founder_id']);
    table.index(['status']);
    table.unique(['retreat_id', 'founder_id']);
  });

  await knex.schema.createTable('compatibility_scores', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('founder_id_1').references('id').inTable('founders').onDelete('CASCADE');
    table.uuid('founder_id_2').references('id').inTable('founders').onDelete('CASCADE');
    table.integer('overall_score').notNullable();
    table.integer('vision_alignment');
    table.integer('risk_sync');
    table.integer('emotional_availability');
    table.integer('lifestyle_compatibility');
    table.integer('communication_style');
    table.jsonb('insights').defaultTo('{}');
    table.jsonb('red_flags').defaultTo('[]');
    table.jsonb('recommendations').defaultTo('[]');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index(['founder_id_1']);
    table.index(['founder_id_2']);
    table.index(['overall_score']);
    table.unique(['founder_id_1', 'founder_id_2']);
  });

  await knex.schema.createTable('inner_circle_connections', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('founder_id').references('id').inTable('founders').onDelete('CASCADE');
    table.uuid('connection_founder_id').references('id').inTable('founders').onDelete('SET NULL');
    table.string('connection_name').notNullable();
    table.string('relationship');
    table.string('status').defaultTo('active');
    table.text('notes');
    table.jsonb('tags').defaultTo('[]');
    table.timestamp('connected_at').defaultTo(knex.fn.now());
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index(['founder_id']);
    table.index(['status']);
  });

  await knex.schema.createTable('referrals', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('referrer_id').references('id').inTable('founders').onDelete('CASCADE');
    table.uuid('referred_founder_id').references('id').inTable('founders').onDelete('CASCADE');
    table.text('message').notNullable();
    table.enum('confidence', ['high', 'medium', 'low']).notNullable();
    table.string('status').defaultTo('pending');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index(['referrer_id']);
    table.index(['referred_founder_id']);
    table.index(['status']);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('referrals');
  await knex.schema.dropTableIfExists('inner_circle_connections');
  await knex.schema.dropTableIfExists('compatibility_scores');
  await knex.schema.dropTableIfExists('retreat_registrations');
  await knex.schema.dropTableIfExists('builder_retreats');
  await knex.schema.dropTableIfExists('emotional_checkins');
  await knex.schema.dropTableIfExists('founder_preferences');
  await knex.schema.dropTableIfExists('founder_goals');
  await knex.schema.dropTableIfExists('founder_values');
  await knex.schema.dropTableIfExists('founder_interests');
  await knex.schema.dropTableIfExists('founder_skills');
  await knex.schema.dropTableIfExists('founders');
  await knex.schema.dropTableIfExists('integrations');
  await knex.schema.dropTableIfExists('startups');
  await knex.schema.dropTableIfExists('password_reset_tokens');
  await knex.schema.dropTableIfExists('refresh_tokens');

  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('role');
    table.dropColumn('is_active');
  });
};
